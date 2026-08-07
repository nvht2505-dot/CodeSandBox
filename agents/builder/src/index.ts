import type {Agent} from "../../../services/kernel/src/agent";
import {run} from "../../../services/runtime/src/process";

const Builder:Agent={

  name:"builder",

  async execute(task){

    console.log("[Builder]",task.action);

    const install=await run("npm",["install"]);

    console.log(install.stdout);

    const build=await run("npm",["run","build"]);

    console.log(build.stdout);
    console.log(build.stderr);

  }

};

export default Builder;
