import Task from '../models/Task';
import SchedulerItemModel from '../models/SchedulerItemModel';

export default class IndexViewModel {
    private tasks: Task[];
    private schedule: number[];
    private files: string[];
    private currentFile: string;
    private schedulers: SchedulerItemModel[];
    private currentScheduler: string;

    constructor(tasks: Task[], schedule: number[], files: string[], currentFile: string, schedulers: SchedulerItemModel[], currentScheduler: string) {
        this.tasks = tasks;
        this.schedule = schedule;
        this.files = files;
        this.currentFile = currentFile;
        this.schedulers = schedulers;
        this.currentScheduler = currentScheduler;
    }

    public getTasks() {
        return this.tasks;
    }

    public getSchedule() {
        return this.schedule;
    }

    public getFiles() {
        return this.files;
    }

    public getCurrentFile() {
        return this.currentFile;
    }

    public getSchedulers() {
        return this.schedulers;
    }

    public getCurrentScheduler() {
        return this.currentScheduler;
    }
}