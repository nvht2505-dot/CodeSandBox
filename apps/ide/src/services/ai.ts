export async function askAI(prompt:string){

  const res = await fetch("http://localhost:3001/chat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({prompt})
  });

  return await res.json();

}
