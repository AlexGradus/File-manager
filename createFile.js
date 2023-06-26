import path from "path";
import fs from "fs";

export default async function createFile(directory, fileName) {
  const filePath = path.join(directory, fileName);
  try {
    await fs.promises.writeFile(filePath, "");
    console.log(`File is created.`);
  } catch (error) {
    console.log(error);
  }
}
