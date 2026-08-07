import type {Agent} from "../../../services/kernel/src/agent";

const Planner:Agent={

  name:"planner",

  async execute(task){

    console.log("[Planner]",task.action);

  }

};

export default Planner;
