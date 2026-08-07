import type {Agent} from "../../../services/kernel/src/agent";
import {
  tools,
  send
} from "../../../services/kernel/src/agent";
import {route} from "../../../services/ai-router/src/router";

const Coder:Agent={

  name:"coder",

  async execute(task){

    const result=await route(
      task.payload?.prompt ?? "Generate project"
    );

    await tools.workspace.writeFile(
      "workspace/output.ts",
      result.message
    );

    send({
      from:"coder",
      to:"builder",
      type:"build",
      payload:{
        file:"workspace/output.ts"
      }
    });

  }

};

export default Coder;
