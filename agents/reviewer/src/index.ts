import type {Agent} from "../../../services/kernel/src/agent";

const Reviewer:Agent={

  name:"reviewer",

  async execute(task){

    console.log("[Reviewer]",task.action);

  }

};

export default Reviewer;
