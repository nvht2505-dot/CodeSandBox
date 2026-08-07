import {dequeue} from "./queue";

export async function startScheduler(){

  setInterval(async()=>{

    const task=dequeue();

    if(!task) return;

    console.log("[TASK]",task.action);

    task.status="running";

    task.status="done";

  },100);

}
