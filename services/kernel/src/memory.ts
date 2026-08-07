export interface MemoryItem{
  id:string;
  role:string;
  content:string;
  time:number;
}

const memory:MemoryItem[]=[];

export function remember(role:string,content:string){

  memory.push({
    id:crypto.randomUUID(),
    role,
    content,
    time:Date.now()
  });

}

export function recall(limit=20){

  return memory.slice(-limit);

}

export function clearMemory(){

  memory.length=0;

}
