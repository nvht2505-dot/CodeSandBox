import {enqueue} from "./queue";
import {startScheduler} from "./scheduler";

startScheduler();

enqueue({
  id:crypto.randomUUID(),
  agent:"planner",
  action:"startup",
  payload:{},
  status:"waiting"
});
