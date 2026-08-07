import {dequeue} from "./queue";
import {dispatch} from "./manager";

export async function startScheduler(){

  setInterval(async()=>{

    const task=dequeue();

    if(!task) return;

    task.status="running";

    await dispatch(task);

    task.status="done";

  },100);

}
