"use strict";
exports.__esModule = true;
var Task = (function () {
    function Task(start, duration) {
        this.start = start;
        this.duration = duration;
    }
    Task.prototype.getStart = function () {
        return this.start;
    };
    Task.prototype.getDuration = function () {
        return this.duration;
    };
    Task.prototype.setDuration = function (duration) {
        this.duration = duration;
    };
    return Task;
}());
exports["default"] = Task;
