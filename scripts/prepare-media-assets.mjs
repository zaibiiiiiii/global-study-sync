import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { chromium } from "playwright";

const root = process.cwd();
const outDir = path.join(root, "public", "images", "editorial");
const assets = [
  { id: "4031693", name: "research-collaboration" },
  { id: "6340677", name: "feasibility-review" },
  { id: "9243741", name: "site-capabilities" },
  { id: "4989174", name: "research-workspace" },
  { id: "8532860", name: "laboratory-research" },
];

await mkdir(outDir, { recursive: true });

for (const { id, name } of assets) {
  const url = new URL(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`);
  url.searchParams.set("auto", "compress");
  url.searchParams.set("cs", "tinysrgb");
  url.searchParams.set("w", "2000");
  url.searchParams.set("q", "88");
  const response = await fetch(url);
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
    throw new Error(`Could not download Pexels image ${id}: ${response.status}`);
  }
  const image = Buffer.from(await response.arrayBuffer());
  await sharp(image)
    .rotate()
    .resize({ width: 1800, height: 1200, fit: "cover", position: "attention" })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outDir, `${name}.webp`));
}

// Capture a full-resolution poster from the supplied hero video using the
// browser's native MP4 decoder, avoiding a separate video utility dependency.
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  const frame = await page.evaluate(async () => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = "/video/hero.mp4";
    await new Promise((resolve, reject) => {
      video.addEventListener("loadeddata", resolve, { once: true });
      video.addEventListener("error", () => reject(new Error("Hero video could not be decoded")), { once: true });
    });
    video.currentTime = Math.min(1, video.duration / 4);
    await new Promise((resolve) => video.addEventListener("seeked", resolve, { once: true }));
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    return canvas.toDataURL("image/png").split(",")[1];
  });
  await sharp(Buffer.from(frame, "base64"))
    .resize({ width: 1920, height: 1080, fit: "cover" })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(root, "public", "images", "hero-poster.webp"));
} finally {
  await browser.close();
}

console.log(`Prepared ${assets.length} still images and a video poster.`);
