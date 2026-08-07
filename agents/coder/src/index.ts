import type {Agent} from "../../../services/kernel/src/agent";
import {tools} from "../../../services/kernel/src/agent";
import {route} from "../../../services/ai-router/src/router";

const Coder:Agent={

  name:"coder",

  async execute(task){

    console.log("[Coder]",task.action);

    const result=await route(task.payload?.prompt ?? "Generate project");

    await tools.workspace.writeFile(
      "workspace/ai-output.json",
      JSON.stringify(result,null,2)
    );

    console.log(result);

  }

};

export default Coder;
