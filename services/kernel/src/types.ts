export interface Task{
  id:string;
  agent:string;
  action:string;
  payload:any;
  status:"waiting"|"running"|"done"|"failed";
}
