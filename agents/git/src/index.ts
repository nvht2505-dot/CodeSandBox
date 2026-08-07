import type {Agent} from "../../../services/kernel/src/agent";

const Git:Agent={

  name:"git",

  async execute(task){

    console.log("[Git]",task.action);

  }

};

export default Git;
