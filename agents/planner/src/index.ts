import type {Agent} from "../../../services/kernel/src/agent";
import {enqueue} from "../../../services/kernel/src/queue";
import {remember} from "../../../services/kernel/src/memory";

const Planner:Agent={

  name:"planner",

  async execute(task){

    remember("user",task.action);

    if(task.action==="plan"){

      enqueue({
        id:crypto.randomUUID(),
        agent:"coder",
        action:"generate-project",
        payload:task.payload,
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"builder",
        action:"build-project",
        payload:task.payload,
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"debugger",
        action:"scan-errors",
        payload:task.payload,
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"reviewer",
        action:"review-code",
        payload:task.payload,
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"git",
        action:"commit",
        payload:task.payload,
        status:"waiting"
      });

      enqueue({
        id:crypto.randomUUID(),
        agent:"deploy",
        action:"deploy",
        payload:task.payload,
        status:"waiting"
      });

    }

  }

};

export default Planner;
