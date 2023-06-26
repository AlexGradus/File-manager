import path from "path";
import fs from "fs";
import { pipeline } from "node:stream/promises";
import zlib from "zlib";


export default async function compressFile(sourcePath, destinationDirectory,currentDirectory) {
    try {
      const sourceFile = path.resolve(currentDirectory, sourcePath);
      const sourceFileName = path.basename(sourceFile);
      const destinationFile = path.join(destinationDirectory, `${sourceFileName}.br`);
  
      const sourceStats = await fs.promises.stat(sourceFile);
      if (!sourceStats.isFile()) {
        throw new Error("Invalid input. Only files can be compressed.");
      }
  
      const sourceStream = fs.createReadStream(sourceFile);
      const destinationStream = fs.createWriteStream(destinationFile);
  
      const compressStream = zlib.createBrotliCompress();
  
      await pipeline(sourceStream, compressStream, destinationStream);
  
      console.log(`File '${sourceFileName}' compressed to '${destinationFile}'.`);
    } catch (error) {
      console.log(`Error compressing file: ${error.message}`);
    }
  }
  