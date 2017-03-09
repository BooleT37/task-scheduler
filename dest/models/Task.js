"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Task;
//# sourceMappingURL=Task.js.map