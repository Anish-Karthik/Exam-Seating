"use server";

import * as fs from "fs";
import path from "path";

export async function writeFile(
  filePath: string,
  fileData: string
): Promise<void> {
  try {
    await createFolder(path.dirname(filePath));
    await fs.promises.writeFile(filePath, fileData);
  } catch (err) {
    throw err;
  }
}

export async function createFolder(dirName: string): Promise<void> {
  try {
    await fs.promises.mkdir(dirName, { recursive: true });
  } catch (err: any) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}
