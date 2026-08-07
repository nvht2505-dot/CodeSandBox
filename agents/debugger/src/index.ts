import type {Agent} from "../../../services/kernel/src/agent";
import {run} from "../../../services/runtime/src/process";
import {remember} from "../../../services/kernel/src/memory";

const Debugger:Agent={

  name:"debugger",

  async execute(task){

    console.log("[Debugger]",task.action);

    const result=await run("npm",["run","build"]);

    if(result.code!==0){

      remember("build-error",result.stderr);

      console.log(result.stderr);

    }

  }

};

export default Debugger;
