import {onStatus,onToken} from "./stream";

const dashboard={
  status:new Map<string,string>(),
  logs:[] as string[]
};

onStatus(({agent,status})=>{

  dashboard.status.set(agent,status);

  dashboard.logs.push(
    "["+agent+"] "+status
  );

});

onToken(({agent,token})=>{

  dashboard.logs.push(
    "["+agent+"] "+token
  );

});

export function getDashboard(){

  return{
    agents:Object.fromEntries(
      dashboard.status
    ),
    logs:dashboard.logs
  };

}
