import type {Agent} from "../../../services/kernel/src/agent";
import {
  subscribe
} from "../../../services/kernel/src/agent";
import {run} from "../../../services/runtime/src/process";

subscribe("builder",async(message)=>{

  console.log("[Builder Event]",message);

  await run("npm",["run","build"]);

});

const Builder:Agent={

  name:"builder",

  async execute(task){

    console.log("[Builder]",task.action);

  }

};

export default Builder;
