//Serviço construtor de AJAX para a tabela cabinets.
angular.module('biblioteca')

.service("relatoriosAPI", function($http, config){
	this.buscaPorData = function(url){
		return $http.get(config.baseUrl + '/Fluxo' + url);
	}	
});