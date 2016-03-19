angular.module('biblioteca')

.service("cabinetAPI", function($http, config){
	this.saveCabinet = function(usuario) {
		return $http.post(config.baseUrl + '/Cabinet', usuario);
	}

	this.buscarCabinets = function(){
		return $http.get(config.baseUrl + '/Cabinet');
	}

	this.buscarCabinet = function(id){
		return $http.get(config.baseUrl + '/Cabinet/' + id);
	}
	
});