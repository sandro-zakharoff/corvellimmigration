import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const environment = loadEnv(mode, process.cwd(), ["DEV_PORT", "SERVER_PORT"]);
    const clientPort = Number(environment.DEV_PORT || 5173);
    const serverPort = Number(environment.SERVER_PORT || 5174);

    for (const [name, port] of [["DEV_PORT", clientPort], ["SERVER_PORT", serverPort]]) {
        if (!Number.isInteger(port) || port < 1 || port > 65535) {
            throw new Error(`${name} must be a port between 1 and 65535.`);
        }
    }

    return {
        plugins: [react()],
        server: {
            host: "127.0.0.1",
            port: clientPort,
            strictPort: true,
            proxy: {
                "/api": `http://127.0.0.1:${serverPort}`
            }
        },
        preview: {
            host: "127.0.0.1"
        }
    };
});
