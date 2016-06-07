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
		return $http.delete(config.baseUrl + '/Visitor/' + id);//Não deleta, muda status do visitante.
	}

	this.editarVisitor = function(visitor){
		return $http.put(config.baseUrl + '/Visitor/'+visitor.id, visitor);
	}
	
	this.paginaVisitor = function(url){
		return $http.get('/paginaVisitor'+url);
	}

	this.consultaCep = function(cep){
		return $http.get('/pegaCep'+cep);
	}

});