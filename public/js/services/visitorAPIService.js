angular.module('biblioteca')

.service("visitorAPI", function($http, config){
	this.saveVisitor = function(visitor) {
		return $http.post(config.baseUrl + '/Visitor', visitor);
	}

	this.buscarVisitors = function(){
		return $http.get(config.baseUrl + '/Visitor');
	}

	this.buscaVisitor = function(id){
		return $http.get(config.baseUrl + '/Visitor/'+id);
	}

	this.deletarVisitor = function(id){
		return $http.delete(config.baseUrl + '/Visitor/' + id);
	}

	this.paginaVisitor = function(url){
		return $http.get('/paginaVisitor'+url);
	}
	
});