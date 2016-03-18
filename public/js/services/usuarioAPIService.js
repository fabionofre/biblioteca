angular.module('biblioteca')

.service("usuarioAPI", function($http, config){
	this.saveUsuario = function(usuario) {
		return $http.post(config.baseUrl + '/Usuario', usuario);
	}

	this.buscarUsuarios = function(){
		return $http.get(config.baseUrl + '/Usuario');
	}

	this.deletarUsuario = function(id){
		return $http.delete(config.baseUrl + '/Usuario/' + id);
	}
	
});