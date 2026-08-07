export interface Agent{
  name:string;
  execute(task:any):Promise<void>;
}
