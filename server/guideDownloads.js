import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { chmod, link, lstat, mkdir, open, readFile, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import { getGuide } from "../shared/guides.js";
import { getGuideAsset } from "./guideAssets.js";

export const GUIDE_DOWNLOAD_LIFETIME_SECONDS = 90 * 24 * 60 * 60;

const rootDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const tokenPattern = /^v1\.([A-Za-z0-9_-]{22})\.([A-Za-z0-9_-]{43})$/;
const expiresPattern = /^[1-9]\d{0,12}$/;
const assistance = "Please use the PDF attached to your email or request a new guide.";

export class GuideDownloadError extends Error {
    constructor(code = "GUIDE_DOWNLOAD_UNAVAILABLE") {
        super(code);
        this.code = code;
    }
}

function canonicalOrigin(siteUrl) {
    if (typeof siteUrl !== "string") {
        throw new GuideDownloadError();
    }

    const url = new URL(siteUrl);
    const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);

    if ((url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) || url.username || url.password || url.href.includes("?") || url.href.includes("#") || url.pathname !== "/") {
        throw new GuideDownloadError();
    }

    return url.origin;
}

async function readKey(path) {
    const info = await lstat(path);

    if (!info.isFile() || info.size !== 32) {
        throw new GuideDownloadError();
    }

    await chmod(path, 0o600);
    const key = await readFile(path);

    if (key.length !== 32) {
        throw new GuideDownloadError();
    }

    return key;
}

async function loadSigningKey(directory) {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    await chmod(directory, 0o700);
    const keyPath = join(directory, "signing-key");

    try {
        return await readKey(keyPath);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }

    const temporaryPath = join(directory, `.signing-key-${randomUUID()}`);
    const handle = await open(temporaryPath, "wx", 0o600);

    try {
        try {
            await handle.writeFile(randomBytes(32));
            await handle.sync();
        } finally {
            await handle.close();
        }

        try {
            await link(temporaryPath, keyPath);
        } catch (error) {
            if (error.code !== "EEXIST") {
                throw error;
            }
        }

        if (process.platform !== "win32") {
            const folder = await open(directory, "r");

            try {
                await folder.sync();
            } finally {
                await folder.close();
            }
        }
    } finally {
        await unlink(temporaryPath);
    }

    return readKey(keyPath);
}

export function createGuideDownloads({
    siteUrl = "https://corvellimmigration.com",
    directory = join(rootDirectory, "var", "guide-downloads"),
    assetDirectory = join(rootDirectory, "server", "assets", "guides"),
    now = Date.now
} = {}) {
    const router = Router();
    let signingKey;
    let origin;
    let initializing;

    function currentSeconds() {
        const seconds = Math.floor(now() / 1000);

        if (!Number.isSafeInteger(seconds) || seconds < 0) {
            throw new GuideDownloadError();
        }

        return seconds;
    }

    function signature(guideId, expires, nonce) {
        return createHmac("sha256", signingKey)
            .update(`corvell-guide-download:v1\n${guideId}\n${expires}\n${nonce}`)
            .digest("base64url");
    }

    function reply(response, status, message) {
        response.removeHeader("Content-Disposition");
        response.status(status).type("text/plain").send(`${message} ${assistance}`);
    }

    router.use((request, response, next) => {
        response.set({
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "no-referrer",
            "X-Robots-Tag": "noindex, nofollow, nosnippet"
        });

        if (!["GET", "HEAD"].includes(request.method)) {
            response.set("Allow", "GET, HEAD");
            reply(response, 405, "This download method is not supported.");
            return;
        }

        if (!signingKey) {
            reply(response, 503, "Guide downloads are temporarily unavailable.");
            return;
        }

        if (request.originalUrl.length > 512) {
            reply(response, 403, "This download link is invalid.");
            return;
        }

        next();
    });

    router.get("/:guideId", async (request, response) => {
        const { guideId } = request.params;
        const { expires, token } = request.query;
        const match = typeof token === "string" ? token.match(tokenPattern) : null;

        if (!getGuide(guideId) || Object.keys(request.query).length !== 2 || typeof expires !== "string" || !expiresPattern.test(expires) || !match) {
            reply(response, 403, "This download link is invalid.");
            return;
        }

        const expected = signature(guideId, expires, match[1]);

        if (!timingSafeEqual(Buffer.from(expected), Buffer.from(match[2]))) {
            reply(response, 403, "This download link is invalid.");
            return;
        }

        if (Number(expires) <= currentSeconds()) {
            reply(response, 410, "This download link has expired.");
            return;
        }

        let asset;

        try {
            asset = await getGuideAsset(guideId, { directory: assetDirectory });
        } catch {
            reply(response, 503, "This guide is temporarily unavailable.");
            return;
        }

        response.download(asset.path, asset.filename, {
            cacheControl: false,
            lastModified: false,
            acceptRanges: true,
            dotfiles: "deny"
        }, (error) => {
            if (!error) {
                return;
            }

            if (response.headersSent) {
                response.destroy();
                return;
            }

            if (error.status === 416 || error.statusCode === 416) {
                reply(response, 416, "The requested file range is unavailable.");
                return;
            }

            reply(response, 503, "This guide is temporarily unavailable.");
        });
    });

    router.use((request, response) => reply(response, 403, "This download link is invalid."));
    router.use((error, request, response, next) => {
        if (response.headersSent) {
            next(error);
            return;
        }

        reply(response, error instanceof URIError ? 403 : 503, "This download link is unavailable.");
    });

    return {
        router,
        start() {
            if (signingKey) {
                return Promise.resolve();
            }

            if (!initializing) {
                initializing = (async () => {
                    try {
                        origin = canonicalOrigin(siteUrl);
                        signingKey = await loadSigningKey(directory);
                    } catch {
                        throw new GuideDownloadError();
                    }
                })().finally(() => {
                    initializing = undefined;
                });
            }

            return initializing;
        },
        createUrl(guideId) {
            if (!getGuide(guideId)) {
                throw new GuideDownloadError("GUIDE_UNAVAILABLE");
            }

            if (!signingKey || !origin) {
                throw new GuideDownloadError();
            }

            const expires = String(currentSeconds() + GUIDE_DOWNLOAD_LIFETIME_SECONDS);
            const nonce = randomBytes(16).toString("base64url");
            const token = `v1.${nonce}.${signature(guideId, expires, nonce)}`;
            const url = new URL(`/api/guides/download/${guideId}`, origin);
            url.searchParams.set("expires", expires);
            url.searchParams.set("token", token);
            return url.href;
        }
    };
}
