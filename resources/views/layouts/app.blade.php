    <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Biblioteca Pública Estadual do Acre</title>

    <!-- Fonts -->

    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'> -->

    <link rel="stylesheet" type="text/css" href="css/font-awesome-4.6.1/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    
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
                <a class="navbar-brand" href="#/inicio">
                    Inicio
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    @if(Auth::guest())
                    @else
                    <!--<li><a href="/#/armarios">Armários</a></li> -->
                    <li><a href="/#/entrada">Entrada</a></li>
                    @if (Auth::user()->tipo == 'admin')
                    <li><a href="#/registrar">Cadastrar Usuário</a></li>
                    @else
                    @if(Auth::user()->tipo == 'atd')
                    <li><a href="#/visitantes">Visitantes</a></li>
                    @endif
                    @endif
                    @endif
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                    @if (Auth::guest())
                        <li><a href="/login">Login</a></li>
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

    @if(Auth::guest())
        @yield('content')
    @else
        <div ng-view></div>
    @endif

</body>
<footer>
    <div><h5 class="text-center">&copy;2016 Biblioteca Pública Estadual do Acre | Desenvolvido por Fábio Onofre</h5></div>
</footer>
<!-- Dependências -->
    <script src="js/angularJS.js"></script>
    <script src="js/angular-route.js"></script>
    <script src="js/ui-bootstrap-1.2.4.min.js"></script>
    <script src="js/ui-bootstrap-tpls-1.3.2.min.js"></script>
    <script src="js/moment.js"></script>
    <script src="js/angular-locale_pt-br.js"></script>
    <script src="js/angular-input-masks.br.js"></script>
    <script src="js/angular-br-filters.js"></script>
<!-- Módulo AngularJS -->
    <script src="js/app.js"></script>
<!-- Configs AngularJS -->
    <script src="js/configs/routeConfig.js"></script>
    <script src="js/configs/configValue.js"></script>
<!-- Controlador e serviços dos armários -->
    <script src="js/controllers/cabinetController.js"></script>
    <script src="js/services/cabinetAPIService.js"></script>
<!-- Controlador e serviços dos usuários -->    
    <script src="js/controllers/usuarioController.js"></script>
    <script src="js/services/usuarioAPIService.js"></script>
<!-- Controlador e serviços dos visitantes -->
    <script src="js/controllers/visitorController.js"></script>
    <script src="js/services/visitorAPIService.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</html>

