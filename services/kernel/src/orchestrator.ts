import {createSession} from "./session";
import {enqueue} from "./queue";

export function runPrompt(prompt:string){

  const session=createSession(prompt);

  [
    "planner",
    "coder",
    "builder",
    "debugger",
    "reviewer",
    "git",
    "deploy"
  ].forEach(agent=>{

    enqueue({
      id:crypto.randomUUID(),
      agent,
      action:"execute",
      payload:{
        session,
        prompt
      },
      status:"waiting"
    });

  });

}
