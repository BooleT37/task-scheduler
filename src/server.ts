import * as express from 'express';
import * as fs from 'fs';

import Task from './models/Task';
import RandomScheduler from './schedulers/RandomScheduler';
import IndexViewModel from "./viewModels/IndexViewModel";
import FileNotFoundViewModel from "./viewModels/FileNotFoundViewModel";
import RandomTasksGenerator from "./tasksGenerators/RandomTasksGenerator";

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
    res.redirect("/?file=" + filename);
})

var server = app.listen(8090, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log('Example app listening at http://%s:%s', host, port);
});