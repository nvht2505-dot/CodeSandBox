import type {Agent} from "../../../services/kernel/src/agent";
import {tools,send} from "../../../services/kernel/src/agent";
import {emitStatus,emitToken} from "../../../services/kernel/src/stream";
import {route} from "../../../services/ai-router/src/router";

const Coder:Agent={

  name:"coder",

  async execute(task){

    emitStatus("coder","thinking");

    const result=await route(
      task.payload?.prompt ?? "Generate project"
    );

    emitToken("coder",result.message);

    await tools.workspace.writeFile(
      "workspace/output.ts",
      result.message
    );

    emitStatus("coder","done");

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
