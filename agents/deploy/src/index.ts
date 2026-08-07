import type {Agent} from "../../../services/kernel/src/agent";
import {run} from "../../../services/runtime/src/process";

const Deploy:Agent={

  name:"deploy",

  async execute(task){

    console.log("[Deploy]",task.action);

    const result=await run("npm",[
      "run",
      "deploy"
    ]);

    console.log(result.stdout);
    console.log(result.stderr);

  }

};

export default Deploy;
