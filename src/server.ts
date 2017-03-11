import * as express from 'express';
import * as fs from 'fs';

import Task from './models/Task';
import RandomScheduler from './schedulers/RandomScheduler';
import IndexViewModel from "./viewModels/IndexViewModel";

var app = express();

//setting "public" folder as static resourses folder
app.use(express.static('public'));

//settings "views" folder as folder for ejs templates
app.set('views', process.cwd() + '\\src\\templates');

app.get('/', function (req, res) {
    var tasks = JSON.parse(fs.readFileSync('data\\sample_tasks.json', 'utf8')).map(jsonTask => new Task(jsonTask.start, jsonTask.duration));
    var scheduler = new RandomScheduler();
    var schedule = scheduler.schedule(tasks);

    var model = new IndexViewModel(tasks, schedule);
    res.render('index.ejs', { model: model });
})

var server = app.listen(8090, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log('Example app listening at http://%s:%s', host, port);
});