import * as express from 'express';
import * as fs from 'fs';
import * as queryString  from 'query-string';

import Task from './models/Task';
import SchedulerItemModel from './models/SchedulerItemModel';
import RandomScheduler from './schedulers/RandomScheduler';
import FastestFirstScheduler from './schedulers/FastestFirstScheduler';
import IndexViewModel from "./viewModels/IndexViewModel";
import FileNotFoundViewModel from "./viewModels/FileNotFoundViewModel";
import RandomTasksGenerator from "./tasksGenerators/RandomTasksGenerator";

var app = express();

//setting "public" folder as static resourses folder
app.use(express.static('public'));

//settings "views" folder as folder for ejs templates
app.set('views', process.cwd() + '/src/templates');

const availibleSchedulers: SchedulerItemModel[] = [
    new SchedulerItemModel("Случайный", "random"),
    new SchedulerItemModel("Сначала короткие", "fastestFirst")
]

app.get('/', function (req, res) {
    var fileName = req.query.file;
    var schedulerName = req.query.scheduler;
    var files = fs.readdirSync("data");
    if (!fileName || !schedulerName) {
        if (!fileName) {
            fileName = files[0];
        }
        if (!schedulerName) {
            schedulerName = "random";
        }
        res.redirect(`/?${queryString.stringify({file: fileName, scheduler: schedulerName})}`);
    } else {
        var file : string;
        try {
            file = fs.readFileSync('data/' + fileName, 'utf8');
        } catch (e) {
            let model = new FileNotFoundViewModel(fileName);
            res.render('404-fileNotFound.ejs', { model: model });
            return;
        }
        var tasks = JSON.parse(file).map(jsonTask => new Task(jsonTask.start, jsonTask.duration));
        var scheduler;
        switch (schedulerName) {
            case "random":
                scheduler = new RandomScheduler();
                break;
            case "fastestFirst":
                scheduler = new FastestFirstScheduler();
                break;
            default:
                throw new Error(`Unknown scheduler: ${scheduler}`);
        }
        var schedule = scheduler.schedule(tasks);
        var model = new IndexViewModel(tasks, schedule, files, fileName, availibleSchedulers, schedulerName);
        res.render('index.ejs', { model: model });
    }
});

app.get('/generate', function(req, res) {
    var files = fs.readdirSync('data');
    var index = 1;
    var exists = true;
    while (exists) {
        try {
            fs.accessSync(process.cwd() + '/data/generated_tasks_' + index.toString() + '.json', fs.constants.R_OK);
            index++;
        } catch (e) {
            exists = false;
        }
    }
    var filename = 'generated_tasks_' + index.toString() + '.json';
    var filePath = process.cwd() + '/data/' + filename;
    var tasksGenerator = new RandomTasksGenerator();
    var tasks = tasksGenerator.generate();
    fs.writeFileSync(filePath, JSON.stringify(tasks), { flag: 'wx' });
    res.redirect(`/?${queryString.stringify({file: filename})}`);
})

var server = app.listen(8090, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log('Example app listening at http://%s:%s', host, port);
});