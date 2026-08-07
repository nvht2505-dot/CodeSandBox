import {run} from "../../runtime/src/process";

export async function commit(message:string){

  await run("git",["add","."]);

  await run("git",[
    "commit",
    "-m",
    message
  ]);

}

export async function push(){

  return await run("git",[
    "push"
  ]);

}
