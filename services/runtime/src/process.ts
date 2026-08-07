import {spawn} from "child_process";

export async function run(command:string,args:string[]=[],cwd="."){

  return await new Promise((resolve,reject)=>{

    const child=spawn(command,args,{
      cwd,
      shell:true
    });

    let stdout="";
    let stderr="";

    child.stdout.on("data",d=>stdout+=d);
    child.stderr.on("data",d=>stderr+=d);

    child.on("close",code=>{

      resolve({
        code,
        stdout,
        stderr
      });

    });

    child.on("error",reject);

  });

}
