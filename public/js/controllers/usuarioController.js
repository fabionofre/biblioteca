angular.module('biblioteca')

.controller('usuarioCtrl', function($scope, usuarioAPI) {
	
	$scope.registrar = function () {
		usuarioAPI.saveUsuario($scope.user).success(function(data, status, headers, config) {
			// $location.path('/usuarios');
		});
	}
});
	