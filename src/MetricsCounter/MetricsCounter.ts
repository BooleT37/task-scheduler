import Task from "../models/Task";

export default class MetricsCounter {
    static countDelays(tasks: Task[], schedule: number[]): number[] {
        var res = [];
        tasks.forEach((task, index) => {
            var expectedEndingTime = task.getStart() + task.getDuration() - 1
            var actualEndingTime = schedule.reduce((lastIndex, currentTask, currentIndex) => currentTask === index ? currentIndex : lastIndex, -1);
            res[index] = actualEndingTime - expectedEndingTime;
        });
        return res;
    } 
}