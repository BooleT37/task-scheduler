import GenericScheduler from "./GenericScheduler";
import Task from "../models/Task";

class RandomScheduler extends GenericScheduler {
    scheduleOneTick(availibleTasks: number[], schedule: number[], tasks: Task[]): number {
        return availibleTasks[Math.floor(Math.random() * availibleTasks.length)];
    }
}

export default RandomScheduler;