import { open } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getGuide } from "../shared/guides.js";

const defaultDirectory = join(dirname(fileURLToPath(import.meta.url)), "assets", "guides");

export class GuideAssetError extends Error {
    constructor() {
        super("GUIDE_UNAVAILABLE");
        this.code = "GUIDE_UNAVAILABLE";
    }
}

export async function getGuideAsset(guideId, { directory = defaultDirectory } = {}) {
    const guide = getGuide(guideId);

    if (!guide) {
        throw new GuideAssetError();
    }

    const path = join(directory, `${guide.id}-guide.pdf`);

    try {
        const handle = await open(path, "r");

        try {
            const info = await handle.stat();
            const header = Buffer.alloc(5);
            const { bytesRead } = await handle.read(header, 0, 5, 0);

            if (!info.isFile() || bytesRead !== 5 || header.toString() !== "%PDF-") {
                throw new GuideAssetError();
            }
        } finally {
            await handle.close();
        }
    } catch {
        throw new GuideAssetError();
    }

    return { guide, path, filename: `${guide.id.toUpperCase()} guide.pdf` };
}
