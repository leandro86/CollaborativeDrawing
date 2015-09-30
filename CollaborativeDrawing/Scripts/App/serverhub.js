app.ServerHub = (function() {
    var self = this;

    self.drawHub = $.connection.drawingHub;
    self.ee = new EventEmitter();

    self.drawHub.client.drawLine = function(line) {
        self.ee.emitEvent("drawLine", [line]);
    };

    self.drawHub.client.setInitialState = function(lines) {
        self.ee.emitEvent("setInitialState", [lines]);
    };

    self.drawHub.client.updateUsersInCanvas = function (totalUsers) {
        self.ee.emitEvent("updateUsersInCanvas", [totalUsers]);
    };

    self.drawLine = function(startX, startY, endX, endY, lineWidth, lineColor) {
        drawHub.server.drawLine({
            initialPosition: { x: startX, y: startY },
            endPosition: { x: endX, y: endY },
            width: lineWidth,
            color: lineColor
        });
    };

    self.start = function(canvasId) {
        $.connection.hub.qs = { canvasId: canvasId };
        $.connection.hub.start();
    };

    self.addListener = function(event, callback) {
        self.ee.addListener(event, callback);
    };

    return {
        drawLine: self.drawLine,
        start: self.start,
        addListener: self.addListener
    };
})();