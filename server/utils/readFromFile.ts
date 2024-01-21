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

    return JSON.parse(fs.readFileSync(CACHE_FILE_PATH, "utf-8"));
  } catch (error) {
    console.error("Error reading cache file:", error);
    return null;
  }
}
