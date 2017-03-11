import * as express from 'express';
import * as fs from 'fs';

import Task from './models/Task';
import RandomScheduler from './schedulers/RandomScheduler';
import IndexViewModel from "./viewModels/IndexViewModel";
import FileNotFoundViewModel from "./viewModels/FileNotFoundViewModel";

var app = express();

//setting "public" folder as static resourses folder
app.use(express.static('public'));

//settings "views" folder as folder for ejs templates
app.set('views', process.cwd() + '/src/templates');

app.get('/', function (req, res) {
    var fileName = req.query.file;
    var files = fs.readdirSync("data");
    if (!fileName) {
        var firstFile = files[0];
        res.redirect("/?file=" + firstFile);
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
        var scheduler = new RandomScheduler();
        var schedule = scheduler.schedule(tasks);
        var model = new IndexViewModel(tasks, schedule, files, fileName);
        res.render('index.ejs', { model: model });
    }
});

var server = app.listen(8090, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log('Example app listening at http://%s:%s', host, port);
});