/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

async function syncProfile() {
  const remoteUrl =
    "https://raw.githubusercontent.com/HoodieYlya13/HoodieYlya13/main/profile.json";
  const localPath = path.join(__dirname, "../public/info/profile.json");

  console.log(`[sync-profile] Fetching latest profile from ${remoteUrl}...`);

  try {
    const res = await fetch(remoteUrl);
    if (!res.ok)
      throw new Error(`GitHub raw responded with status: ${res.status}`);

    const data = await res.json();

    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(localPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(
      "✅ [sync-profile] Successfully synced profile.json at build-time!",
    );
  } catch (error) {
    console.warn(
      "⚠️ [sync-profile] Failed to fetch remote profile.json, falling back to existing local file:",
      error.message,
    );
  }
}

syncProfile();
