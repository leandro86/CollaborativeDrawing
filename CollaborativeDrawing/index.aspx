<!DOCTYPE html>
<html>
<head>
    <title>Collaborative Drawing</title>
    <meta charset="utf-8"/>
    <link href="Content/bootstrap.min.css" rel="stylesheet"/>
    <link href="Content/style.css" rel="stylesheet"/>
</head>
<body>

<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <a class="navbar-brand" href="#">Collaborative Drawing</a>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
            <li class="navbar-text">Users online in this canvas: <span id="connected-users">0</span></li>
        </ul>
    </div>
</nav>

<div class="container">
    <canvas id="myCanvas" width="1024" height="768"></canvas>
</div>

<div class="navbar navbar-default navbar-fixed-bottom" role="navigation">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav toolbar">
            <li>
                <button class="btn btn-default btn-pencil" data-linewidth="1">
                    <span class="glyphicon glyphicon-pencil gi-extra-small"></span>
                </button>
            </li>
            <li>
                <button class="btn btn-default btn-pencil" data-linewidth="3">
                    <span class="glyphicon glyphicon-pencil gi-small"></span>
                </button>
            </li>
            <li>
                <button class="btn btn-default btn-pencil" data-linewidth="6">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
            </li>
        </ul>

        <ul class="nav navbar-nav toolbar">
            <li>
                <button class="btn btn-default btn-color">
                    <span class="glyphicon glyphicon-tint"></span>
                </button>
            </li>
            <li>
                <button class="btn btn-default btn-color">
                    <span class="glyphicon glyphicon-tint gi-red"></span>
                </button>
            </li>
            <li>
                <button class="btn btn-default btn-color">
                    <span class="glyphicon glyphicon-tint gi-blue"></span>
                </button>
            </li>
            <li>
                <button class="btn btn-default btn-color">
                    <span class="glyphicon glyphicon-tint gi-green"></span>
                </button>
            </li>
        </ul>

        <ul class="nav navbar-nav navbar-right toolbar">
            <li>
                <button id="new-canvas" class="btn btn-primary">New Canvas</button>
            </li>
        </ul>
    </div>
</div>
    
<script src="Scripts/jquery-1.10.2.min.js"></script>
<script src="Scripts/jquery.signalR-2.1.2.min.js"></script>
<script src="signalr/hubs"></script>
<script src="Scripts/bootstrap.min.js"></script>
<script src="Scripts/bootbox.min.js"></script>
<script>var app = app || {}</script>
<script src="Scripts/EventEmitter.min.js"></script>
<script src="Scripts/App/serverhub.js"></script>
<script src="Scripts/App/drawing-surface.js"></script>
<script src="Scripts/App/app.js"></script>

</body>
</html>