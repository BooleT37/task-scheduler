"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var RandomScheduler_1 = require("./schedulers/RandomScheduler");
var app = express();
app.get('/', function (req, res) {
    var tasks = JSON.parse(fs.readFileSync('data/sample_tasks.json', 'utf8'));
    var scheduler = new RandomScheduler_1.default();
    var schedule = scheduler.schedule(tasks);
    res.send(schedule);
});
var server = app.listen(8090, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
//# sourceMappingURL=server.js.map