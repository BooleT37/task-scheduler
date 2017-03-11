import Task from '../models/Task';

export default class IndexViewModel {
    private tasks : Task[];
    private schedule : number[];
    private files : string[];
    private currentFile : string;

    constructor(tasks : Task[], schedule : number[], files : string[], currentFile : string) {
        this.tasks = tasks;
        this.schedule = schedule;
        this.files = files;
        this.currentFile = currentFile;
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
}