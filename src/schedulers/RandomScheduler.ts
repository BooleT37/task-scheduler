"use strict";

import Scheduler from "./Scheduler";
import Task from "../models/Task";

class RandomScheduler implements Scheduler {
    schedule(tasks: Task[]): number[] {
        var schedule = [];
        var taskQueues = tasks.map(task => new Task(task.getStart(), task.getDuration()));
        var totalDuration = taskQueues.reduce((sum, curr) => curr.getDuration() + sum, 0);
        //can't use "for"" beause duration can increase, so for wouldn't be verbose
        var currentTick = 0;
        while (currentTick < totalDuration) {
            var tasksCanComplete : number[] = [];
            taskQueues.forEach((task, index) => {
                if (task.getDuration() !== 0 && task.getStart() <= currentTick) {
                    tasksCanComplete.push(index);
                }
                //if there's no tasks to run at the time, we get "blank" tick, when processor is idle,
                //so we need to increase totalDuration in this case
                if (tasksCanComplete.length === 0) {
                    totalDuration++;
                    schedule.push(-1);
                } else {
                    var taskIndex = Math.floor(Math.random() * tasksCanComplete.length);
                    schedule.push(taskIndex);
                    taskQueues[taskIndex].setDuration(taskQueues[taskIndex].getDuration() - 1);
                }
            });
            return schedule;
        }
    }
}

export default RandomScheduler;