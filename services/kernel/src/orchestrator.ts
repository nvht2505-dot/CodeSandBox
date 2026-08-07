import {enqueue} from "./queue";

export function runPrompt(prompt:string){

  enqueue({
    id:crypto.randomUUID(),
    agent:"planner",
    action:"plan",
    payload:{
      prompt
    },
    status:"waiting"
  });

}
