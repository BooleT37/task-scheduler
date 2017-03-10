import * as express from 'express';
import * as fs from 'fs';
import RandomScheduler from './schedulers/RandomScheduler';
import Task from './models/Task';

var app = express();

app.get('/', function (req, res) {
    var tasks = JSON.parse(fs.readFileSync('data/sample_tasks.json', 'utf8')).map(jsonTask => new Task(jsonTask.start, jsonTask.duration));
    var scheduler = new RandomScheduler();
    var schedule = scheduler.schedule(tasks);
    res.send(schedule);
})

var server = app.listen(8090, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port);
});