import fs from "fs/promises";
import path from "path";

export async function readFile(file:string){

  return await fs.readFile(file,"utf8");

}

export async function writeFile(file:string,content:string){

  await fs.mkdir(path.dirname(file),{
    recursive:true
  });

  await fs.writeFile(file,content);

}

export async function listFiles(dir:string){

  return await fs.readdir(dir,{
    recursive:true
  });

}
