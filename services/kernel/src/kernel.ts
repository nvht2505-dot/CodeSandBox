import {enqueue} from "./queue";
import {register} from "./manager";
import {startScheduler} from "./scheduler";

import Planner from "../../../agents/planner/src";

register(Planner);

startScheduler();

enqueue({
  id:crypto.randomUUID(),
  agent:"planner",
  action:"startup",
  payload:{},
  status:"waiting"
});
