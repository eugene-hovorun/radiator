import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import { COUNTRIES_FILE_NAME, PLACES_FILE_NAME } from "./constants";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

export function readFromFile(
  name: typeof COUNTRIES_FILE_NAME | typeof PLACES_FILE_NAME
) {
  try {
    const CACHE_FILE_PATH = path.join(currentDir, name);

    if (fs.existsSync(CACHE_FILE_PATH)) {
      const fileContent = fs.readFileSync(CACHE_FILE_PATH, "utf-8");
      return JSON.parse(fileContent);
    } else {
      fs.writeFileSync(CACHE_FILE_PATH, "[]");
      return null;
    }
  } catch (error) {
    console.error("Error reading cache file:", error);
    return null;
  }
}
