import {recall} from "./memory";

export function buildContext(prompt:string){

  return {
    prompt,
    history:recall()
  };

}
