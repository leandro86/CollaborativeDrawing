/* global EventEmitter */

var app = app || {};

$(document).ready(function() {
    var surface = (function(canvas) {
        var self = this;

        self.ee = new EventEmitter();

        self.ctx = canvas.getContext("2d");
        self.ctx.lineCap = "round";

        self.mouseMoveEvent = new Event("mousemove");
        self.mouseUpEvent = new Event("mouseup");
        self.mouseDownEvent = new Event("mousedown");

        self.drawLine = function(startX, startY, endX, endY, lineWidth, lineColor) {
            self.ctx.beginPath();
            self.ctx.moveTo(startX, startY);
            self.ctx.lineTo(endX, endY);
            self.ctx.lineWidth = lineWidth;
            self.ctx.strokeStyle = lineColor;
            self.ctx.stroke();
        };

        self.clear = function() {
            self.ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

        self.getMousePosition = function(e) {
            var rect = canvas.getBoundingClientRect();

            var x = e.pageX - rect.left;
            var y = e.pageY - rect.top;

            return [x, y];
        };

        self.mouseDown = function(e) {
            var mousePos = self.getMousePosition(e);
            self.ee.emitEvent("mouseDown", mousePos);
        };

        self.mouseUp = function(e) {
            var mousePos = self.getMousePosition(e);
            self.ee.emitEvent("mouseUp", mousePos);
        };

        self.mouseMove = function(e) {
            var mousePos = self.getMousePosition(e);
            self.ee.emitEvent("mouseMove", mousePos);
        };

        self.addListener = function(event, callback) {
            self.ee.addListener(event, callback);
        };

        canvas.addEventListener("mousedown", self.mouseDown);
        canvas.addEventListener("mouseup", self.mouseUp);
        canvas.addEventListener("mousemove", self.mouseMove);

        return {
            drawLine: self.drawLine,
            clear: self.clear,
            addListener: self.addListener
        };
    });

    var canvas = document.getElementById("myCanvas");
    window.app.Surface = surface(canvas);
});