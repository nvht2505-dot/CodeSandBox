import {tools} from "./tool";

export interface Agent{

  name:string;

  execute(task:any):Promise<void>;

}

export {tools};
