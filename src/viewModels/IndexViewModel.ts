import Task from '../models/Task';

export default class IndexViewModel {
    private tasks : Task[];
    private schedule : number[];

    constructor(tasks : Task[], schedule : number[]) {
        this.tasks = tasks;
        this.schedule = schedule;
    }

    public getTasks() {
        return this.tasks;
    }

    public getSchedule() {
        return this.schedule;
    }
}