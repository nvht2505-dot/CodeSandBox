import {remember} from "./memory";

export interface Session{
  id:string;
  prompt:string;
  created:number;
}

let current:Session|null=null;

export function createSession(prompt:string){

  current={
    id:crypto.randomUUID(),
    prompt,
    created:Date.now()
  };

  remember("session",prompt);

  return current;

}

export function getSession(){
  return current;
}
