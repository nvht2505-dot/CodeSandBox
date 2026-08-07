import type {Agent} from "../../../services/kernel/src/agent";

const Coder:Agent={

  name:"coder",

  async execute(task){

    console.log("[Coder]",task.action);

  }

};

export default Coder;
