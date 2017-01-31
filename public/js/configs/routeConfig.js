angular.module('biblioteca')
	.config(function($routeProvider){
		$routeProvider
			.when("/armarios", {
				templateUrl: "views/armarios.html",
                controller: "cabinetCtrl"
		})
            .when("/registrar", {
                templateUrl: "views/registrar.html",
                controller: "usuarioCtrl"
        })
            .when("/visitantes", {
                templateUrl: "views/visitantes.html",
                controller: "visitorCtrl"
        })
            .when("/login", {
                templateUrl: "views/login.html",
        })
            .when("/inicio", {
                templateUrl: "views/welcome.html"
        })
            .when("/entrada", {
                templateUrl: "views/entrada.html",
                controller: "entradaCtrl"
        })
            .when("/relatorios", {
                templateUrl: "views/relatorios.html",
                controller: "relatoriosCtrl"
        })
            /*.when("/passar", {
                templateUrl: "views/passarDadosVisitante.html",
                controller: "passarDadosCtrl"
        })*/
            $routeProvider.otherwise({
                redirectTo: "/inicio"
            })
});