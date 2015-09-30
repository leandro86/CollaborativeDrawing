$(document).ready(function() {
    (function(surface, serverHub) {
        var self = this;

        self.lineStartPos = { x: 0, y: 0 };
        self.lineWidth = 1;
        self.lineColor = "";

        self.isMouseClicked = false;

        self.loadingAppDialog = bootbox.dialog({
            message: "<p class=\"text-center\">Loading Canvas...</p><div class=\"progress\"><div class=\"progress-bar " +
                "progress-bar-striped active\" role=\"progressbar\"aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\" " +
                "style=\"width:90%\">90%</div></div>",
            size: "small",
            closeButton: false,
            show: true
        });

        self.init = function() {
            self.loadingAppDialog.modal("show");

            self.cacheJQueryElements();
            self.wireEvents();

            self.$pencilButtons.first().trigger("click");
            self.$colorButtons.first().trigger("click");

            var canvasId = window.location.pathname.split("/")[1];
            serverHub.start(canvasId);
        };

        self.cacheJQueryElements = function() {
            self.$pencilButtons = $(".btn-pencil");
            self.$colorButtons = $(".btn-color");
            self.$newCanvas = $("#new-canvas");
            self.$connectedUsers = $("#connected-users");
        };

        self.surfaceMouseDown = function(x, y) {
            self.isMouseClicked = true;

            lineStartPos.x = x;
            lineStartPos.y = y;
        };

        self.surfaceMouseUp = function() {
            self.isMouseClicked = false;
        };

        self.surfaceMouseMove = function(x, y) {
            if (self.isMouseClicked) {
                surface.drawLine(lineStartPos.x, lineStartPos.y, x, y, lineWidth, lineColor);
                serverHub.drawLine(lineStartPos.x, lineStartPos.y, x, y, lineWidth, lineColor);

                lineStartPos.x = x;
                lineStartPos.y = y;
            }
        };

        self.drawLine = function(line) {
            var initialPosition = line.initialPosition;
            var endPosition = line.endPosition;
            surface.drawLine(initialPosition.x, initialPosition.y, endPosition.x, endPosition.y, line.width, line.color);
        };

        self.updateUsersInCanvas = function(totalUsers) {
            self.$connectedUsers.text(totalUsers);
        };

        self.setInitialState = function(lines) {
            $.each(lines, function(i, line) {
                self.drawLine(line);
            });

            self.loadingAppDialog.modal("hide");
        };

        self.selectPencil = function() {
            var $clickedButton = $(this);
            self.lineWidth = $clickedButton.data("linewidth");

            self.$pencilButtons.removeClass("active");
            $clickedButton.addClass("active");
        };

        self.selectColor = function() {
            var $clickedColor = $(this);
            self.lineColor = $clickedColor.find(".glyphicon").css("color");

            self.$colorButtons.removeClass("active");
            $clickedColor.addClass("active");
        };

        self.generateNewCanvas = function() {
            bootbox.confirm("Close this canvas and create a new one?", function(result) {
                if (result) {
                    var letters = "abcdefghijklmnopqrstuvwxyz0123456789";
                    var canvasId = "";

                    for (var i = 0; i < 8; i++) {
                        canvasId += letters.charAt(Math.floor(Math.random() * letters.length));
                    }

                    window.location = location.protocol + "//" + location.host + "/" + canvasId;
                }
            });
        };

        self.wireEvents = function() {
            self.$pencilButtons.on("click", self.selectPencil);
            self.$colorButtons.on("click", self.selectColor);
            self.$newCanvas.on("click", self.generateNewCanvas);

            surface.addListener("mouseDown", self.surfaceMouseDown);
            surface.addListener("mouseUp", self.surfaceMouseUp);
            surface.addListener("mouseMove", self.surfaceMouseMove);

            serverHub.addListener("drawLine", self.drawLine);
            serverHub.addListener("setInitialState", self.setInitialState);
            serverHub.addListener("updateUsersInCanvas", self.updateUsersInCanvas);
        };

        self.init();
    })(window.app.Surface, window.app.ServerHub);
})