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
        
            .when("/login", {
                templateUrl: "views/login.html",
        })
            .when("/inicio", {
                templateUrl: "views/welcome.html"
        })
            $routeProvider.otherwise({
                redirectTo: "/inicio"
            })
});