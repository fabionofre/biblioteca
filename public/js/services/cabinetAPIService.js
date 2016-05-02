//Serviço construtor de AJAX para a tabela cabinets.
angular.module('biblioteca')

.service("cabinetAPI", function($http, config){
	this.saveCabinet = function(cabinet) {
		return $http.post(config.baseUrl + '/Cabinet', cabinet);
	}

	this.buscarCabinets = function(){
		return $http.get(config.baseUrl + '/Cabinet');
	}

	this.buscarCabinet = function(id){
		return $http.get(config.baseUrl + '/Cabinet/' + id);
	}

	this.editarCabinet = function(id, cabinet){
		return $http.put(config.baseUrl + '/Cabinet/'+id, cabinet);
	}
	
});