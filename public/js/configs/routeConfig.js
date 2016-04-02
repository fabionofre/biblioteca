angular.module('biblioteca')
	.config(function($routeProvider){
		$routeProvider
			.when("/armarios", {
				templateUrl: "../resources/viewteste.html"
		});
});