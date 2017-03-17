class Task {
    private start: number;
    private duration: number;

    constructor(start: number, duration: number) {
        this.start = start;
        this.duration = duration;
    }

    public getStart() {
        return this.start;
    }

    public getDuration() {
        return this.duration;
    }

    public setDuration(duration : number) {
        console.log(`${this.duration} => ${duration}`);
        this.duration = duration;
    }
}

export default Task;