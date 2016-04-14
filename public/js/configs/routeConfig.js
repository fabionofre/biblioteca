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
            
});