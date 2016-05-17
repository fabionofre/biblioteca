angular.module('biblioteca')

.controller('visitorCtrl', function($scope, $uibModal, visitorAPI) {

	$scope.consulta = {
    	order: 'name',
    	limit: 15,
    	page: 1
  	};

  	$scope.pesquisa = "";

  	$scope.onChange = function (page, limit) {
      $scope.consulta.page = page;
      $scope.consulta.limit = limit;
      return $scope.pesquisaVisitante();
    };

    $scope.pesquisaVisitante = function(){
	    url = '?page='+$scope.consulta.page;
	    url += '&limit='+$scope.consulta.limit;
	    url += '&order='+$scope.consulta.order;
	    url += '&filtro='+$scope.pesquisa+'%';
	    visitorAPI.paginaVisitor(url).success(function(data){
	      console.log(data);
	      $scope.total = data.total;
	      $scope.visitantes = data.data;
	      if(data.total == 0)
	        $scope.nenhumVisitante = true;
	    })
  	}

  	$scope.pesquisaVisitante();

  $scope.adicionarVisitante = function(){
  	var modalInstance = $uibModal.open({
      templateUrl: 'views/modais/cadastrarVisitante.html',
      controller: 'cadastrarVisitanteCtrl'
    });

     modalInstance.result.then(function (visitante) {
      if(visitante){
        visitante.status = 1;
        visitorAPI.saveVisitor(visitante).success(function(data){
          
        })
      }
    });
  }

  $scope.desativarVisitante = function(){
  	
  }


})

.controller('cadastrarVisitanteCtrl', function($scope, $http, $uibModalInstance, visitorAPI){ 

  $scope.confirmarCadastro = function(){
    $uibModalInstance.close($scope.visitante);
  }

  $scope.consultaCep = function(){
    visitorAPI.consultaCep($scope.visitante.cep).success(function(data){
      $scope.visitante.rua = data.logradouro;
      $scope.visitante.bairro = data.bairro;
      $scope.visitante.cidade = data.localidade;
      $scope.visitante.estado = data.uf;
      $scope.mostraEndereco = true;
    })
  }

  $scope.cancelar = function(){
    $uibModalInstance.dismiss('cancel');
  }

})