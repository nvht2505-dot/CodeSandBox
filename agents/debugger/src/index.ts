import type {Agent} from "../../../services/kernel/src/agent";

const Debugger:Agent={

  name:"debugger",

  async execute(task){

    console.log("[Debugger]",task.action);

  }

};

export default Debugger;
