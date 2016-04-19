<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    {{-- <link href="{{ elixir('css/app.css') }}" rel="stylesheet"> --}}

    <style>
        body {
            font-family: 'Lato';
        }

        .fa-btn {
            margin-right: 6px;
        }
    </style>
</head>
<body id="app-layout" ng-app="biblioteca">
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand" href="#/">
                    Laravel
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    <li><a href="#/armarios">Armários</a></li>
                    @if(Auth::guest())
                    @else
                    @if (Auth::user()->tipo == 'admin')
                    <li><a href="#/registrar">Cadastrar</a></li>
                    @endif
                    @endif
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                    @if (Auth::guest())
                        <li><a href="#/login">Login</a></li>
                    @else
                        <li>
                            <a href="{{ url('/logout') }}"> 
                                {{ Auth::user()->name }}
                            </a>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>
        
    <div ng-view></div>

    <!-- JavaScripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-route.min.js"></script>
    <script src="js/ui-bootstrap-1.2.4.min.js"></script>
    <script src="js/ui-bootstrap-tpls-1.3.2.min.js"></script>
    <script src="js/app.js"></script>
    <script src="js/configs/routeConfig.js"></script>
    <script src="js/configs/configValue.js"></script>
    <!-- Scripts dos armarios -->
     <script src="js/controllers/cabinetController.js"></script>
     <script src="js/services/cabinetAPIService.js"></script>
     
     <script src="js/controllers/usuarioController.js"></script>
     <script src="js/services/usuarioAPIService.js"></script>
     
</body>
</html>
