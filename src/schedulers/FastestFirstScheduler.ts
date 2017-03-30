import GenericScheduler from "./GenericScheduler";
import Task from "../models/Task";

class FastestFirstScheduler extends GenericScheduler {
    scheduleOneTick(availibleTasks: Array<number>, schedule: number[], tasks: Task[]): number {
        var fastestTaskIndex = -1;
        var fastestTaskDuration = 999;
        availibleTasks.forEach(taskIndex => {
            var duration = tasks[taskIndex].getDuration();
            if (duration < fastestTaskDuration) {
                fastestTaskIndex = taskIndex;
                fastestTaskDuration = duration;
            } 
        });
        return fastestTaskIndex;
    }
}

export default FastestFirstScheduler;