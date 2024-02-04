import path from "path";
import fs from "fs";

export default async function readFile(filePath, currentDirectory) {
  try {
    const newPath = path.resolve(currentDirectory, filePath);
    const data = await fs.promises.readFile(newPath, "utf8");
    console.log(data);
  } catch (error) {
    console.error("Operation failed:", error.message);
  }
}
