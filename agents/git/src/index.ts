import type {Agent} from "../../../services/kernel/src/agent";
import * as git from "../../../services/git/src";

const Git:Agent={

  name:"git",

  async execute(task){

    console.log("[Git]",task.action);

    await git.commit("AI Agent Auto Commit");

    const result=await git.push();

    console.log(result.stdout);

  }

};

export default Git;
