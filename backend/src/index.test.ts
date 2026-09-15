import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("server startup", () => {
  it("listens on a local port successfully", async () => {
    const app = createApp();

    await new Promise<void>((resolve, reject) => {
      const server = app.listen(0, () => {
        const address = server.address();
        expect(address).not.toBeNull();
        if (address && typeof address === "object") {
          expect(address.port).toBeGreaterThan(0);
        }
        server.close((err) => (err ? reject(err) : resolve()));
      });
      server.on("error", reject);
    });
  });
});
