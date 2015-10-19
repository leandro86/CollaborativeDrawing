/* global EventEmitter */

var app = app || {};

app.ServerHub = (function() {
    var self = this;

    self.serverUrl = "http://appdrawing.apphb.com";

    self.drawingHub = $.hubConnection(self.serverUrl);
    self.drawingHubProxy = self.drawingHub.createHubProxy("drawingHub");
    self.isConnected = false;
    self.ee = new EventEmitter();

    self.drawLine = function(startX, startY, endX, endY, lineWidth, lineColor) {
        self.drawingHubProxy.invoke("drawLine", {
            initialPosition: {x: startX, y: startY},
            endPosition: {x: endX, y: endY},
            width: lineWidth,
            color: lineColor
        });
    };

    self.start = function(canvasId) {
        self.drawingHub.qs = {canvasId: canvasId};
        self.drawingHub.start().done(self.onConnected);
    };

    self.stop = function() {
        if (self.isConnected) {
            self.drawingHub.stop();
        }
    };

    self.addListener = function(event, callback) {
        self.ee.addListener(event, callback);
    };

    self.onConnected = function() {
        self.isConnected = true;
    };

    self.drawingHubProxy.on("drawLine", function(line) {
        self.ee.emitEvent("drawLine", [line]);
    });

    self.drawingHubProxy.on("setInitialState", function(lines) {
        self.ee.emitEvent("setInitialState", [lines]);
    });

    self.drawingHubProxy.on("updateUsersInCanvas", function(totalUsers) {
        self.ee.emitEvent("updateUsersInCanvas", [totalUsers]);
    });

    return {
        drawLine: self.drawLine,
        start: self.start,
        stop: self.stop,
        addListener: self.addListener
    };
})();