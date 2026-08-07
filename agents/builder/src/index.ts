import type {Agent} from "../../../services/kernel/src/agent";

const Builder:Agent={

  name:"builder",

  async execute(task){

    console.log("[Builder]",task.action);

  }

};

export default Builder;
