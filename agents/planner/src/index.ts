import type {Agent} from "../../../services/kernel/src/agent";
import {enqueue} from "../../../services/kernel/src/queue";

const Planner:Agent={

  name:"planner",

  async execute(task){

    console.log("[Planner]",task.action);

    if(task.action==="startup"){

      enqueue({
        id:crypto.randomUUID(),
        agent:"coder",
        action:"generate-project",
        payload:{},
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"builder",
        action:"build-project",
        payload:{},
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"debugger",
        action:"scan-errors",
        payload:{},
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"reviewer",
        action:"review-code",
        payload:{},
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"git",
        action:"commit",
        payload:{},
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"deploy",
        action:"deploy",
        payload:{},
        status:"waiting"
      });

    }

  }

};

export default Planner;
