import Task from "../models/Task";
import TasksGenerator from "./TasksGenerator";

const TASKS_COUNT_MIN = 4;
const TASKS_COUNT_MAX = 6;
const TASK_DURATION_MIN = 1;
const TASK_DURATION_MAX = 10;
const TOTAL_DURATION_MIN = 10;
const TOTAL_DURATION_MAX = 15;

export default class RandomTasksGenerator implements TasksGenerator {
    private randomInt(from : number, to : number) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }

    generate(): Task[] {
        var tasksCount = this.randomInt(TASKS_COUNT_MIN, TASKS_COUNT_MAX);
        var totalDuration = this.randomInt(TOTAL_DURATION_MIN, TOTAL_DURATION_MAX);
        var tasks = [];
        for (let i = 0; i < tasksCount; i++) {
            let duration = this.randomInt(TASK_DURATION_MIN, TASK_DURATION_MAX);
            let start = this.randomInt(0, totalDuration - duration);
            tasks.push(new Task(start, duration));
        }
        return tasks;
    }
}