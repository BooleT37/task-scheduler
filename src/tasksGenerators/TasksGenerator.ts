import Task from "../models/Task";

interface TasksGenerator {
    generate() : Task[]
}

export default TasksGenerator;