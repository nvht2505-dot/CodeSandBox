import {enqueue} from "./queue";
import {register} from "./manager";
import {startScheduler} from "./scheduler";

import Planner from "../../../agents/planner/src";
import Coder from "../../../agents/coder/src";
import Builder from "../../../agents/builder/src";
import Debugger from "../../../agents/debugger/src";
import Reviewer from "../../../agents/reviewer/src";
import Deploy from "../../../agents/deploy/src";
import Git from "../../../agents/git/src";

register(Planner);
register(Coder);
register(Builder);
register(Debugger);
register(Reviewer);
register(Deploy);
register(Git);

startScheduler();

[
 "planner",
 "coder",
 "builder",
 "debugger",
 "reviewer",
 "deploy",
 "git"
].forEach(agent=>{

 enqueue({
   id:crypto.randomUUID(),
   agent,
   action:"startup",
   payload:{},
   status:"waiting"
 });

});
