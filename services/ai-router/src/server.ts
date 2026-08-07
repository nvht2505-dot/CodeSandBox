import http from "http";
import {route} from "./router";

const server=http.createServer((req,res)=>{

  if(req.method==="POST" && req.url==="/chat"){

    let body="";

    req.on("data",c=>body+=c);

    req.on("end",async()=>{

      const {prompt}=JSON.parse(body);

      const result=await route(prompt);

      res.writeHead(200,{
        "Content-Type":"application/json"
      });

      res.end(JSON.stringify(result));

    });

    return;

  }

  res.writeHead(404);
  res.end();

});

server.listen(3001,()=>{

  console.log("AI Router Online :3001");

});
