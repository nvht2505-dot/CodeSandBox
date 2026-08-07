import {openai} from "./providers/openai";
import {claude} from "./providers/claude";
import {gemini} from "./providers/gemini";
import {qwen} from "./providers/qwen";
import {openrouter} from "./providers/openrouter";
import {openclaw} from "./providers/openclaw";

export async function route(prompt:string){

  if(prompt.includes("fix"))
    return debuggerRoute(prompt);

  if(prompt.includes("review"))
    return claude(prompt);

  if(prompt.includes("ui"))
    return openai(prompt);

  if(prompt.includes("design"))
    return gemini(prompt);

  if(prompt.includes("speed"))
    return qwen(prompt);

  if(prompt.includes("agent"))
    return openclaw(prompt);

  return openrouter(prompt);

}

async function debuggerRoute(prompt:string){
  return qwen(prompt);
}
