import Task from "../models/Task";

interface Scheduler {
    schedule(tasks : Array<Task>) : Array<number>
}

export default Scheduler;