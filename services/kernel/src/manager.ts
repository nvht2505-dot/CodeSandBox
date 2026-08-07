import {state} from "./state";
import type {Agent} from "./agent";

export function register(agent:Agent){
  state.agents.set(agent.name,agent);
}

export async function dispatch(task:any){

  const agent=state.agents.get(task.agent);

  if(!agent){
    console.log("[KERNEL] Missing agent:",task.agent);
    return;
  }

  await agent.execute(task);

}
