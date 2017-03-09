"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task_1 = require("../models/Task");
var RandomScheduler = (function () {
    function RandomScheduler() {
    }
    RandomScheduler.prototype.schedule = function (tasks) {
        var schedule = [];
        var taskQueues = tasks.map(function (task) { return new Task_1.default(task.getStart(), task.getDuration()); });
        var totalDuration = taskQueues.reduce(function (sum, curr) { return curr.getDuration() + sum; }, 0);
        //can't use "for"" beause duration can increase, so for wouldn't be verbose
        var currentTick = 0;
        while (currentTick < totalDuration) {
            var tasksCanComplete;
            taskQueues.forEach(function (task, index) {
                if (task.getDuration() !== 0 && task.getStart() <= currentTick) {
                    tasksCanComplete.push(index);
                }
                //if there's no tasks to run at the time, we get "blank" tick, when processor is idle,
                //so we need to increase totalDuration in this case
                if (tasksCanComplete.length === 0) {
                    totalDuration++;
                    schedule.push(-1);
                }
                else {
                    var taskIndex = Math.floor(Math.random() * tasksCanComplete.length);
                    schedule.push(taskIndex);
                    taskQueues[taskIndex].setDuration(taskQueues[taskIndex].getDuration() - 1);
                }
            });
            return schedule;
        }
    };
    return RandomScheduler;
}());
exports.default = RandomScheduler;
//# sourceMappingURL=RandomScheduler.js.map