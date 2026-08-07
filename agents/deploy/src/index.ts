import type {Agent} from "../../../services/kernel/src/agent";

const Deploy:Agent={

  name:"deploy",

  async execute(task){

    console.log("[Deploy]",task.action);

  }

};

export default Deploy;
