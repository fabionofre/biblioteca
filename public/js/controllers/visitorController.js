angular.module('biblioteca')

.controller('visitorCtrl', function($scope, $uibModal, visitorAPI) {

	$scope.consulta = {
    	order: 'name',
    	limit: 12,
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
      url += '&ativos=0';
	    url += '&limit='+$scope.consulta.limit;
	    url += '&order='+$scope.consulta.order;
	    url += '&filtro='+$scope.pesquisa+'%';
	    visitorAPI.paginaVisitor(url).success(function(data){
	      console.log(data);
	      $scope.total = data.total;
	      $scope.visitantes = data.data;


        $scope.visitantes.forEach(function(visitante){
          if(visitante.status == 1){
            visitante.classe = 'fa fa-remove';
            visitante.title = 'Desativar';
          }else if(visitante.status == 0){
            visitante.classe = 'fa fa-repeat';
            visitante.title = 'Ativar';
          }else{
            visitante.classe = 'fa fa-pencil';
            visitante.title = 'Editar';
          }
        })


	      if(data.total == 0)
	        $scope.nenhumVisitante = true;
        else
          $scope.nenhumVisitante = false;
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
          $scope.pesquisaVisitante();
        })
      }
    });
  }

  if($scope.ordenaAcao)
    $scope.filterAcao = ''
  else


  $scope.desativarVisitante = function(visitante){
    if(visitante.status != 2){
    	visitorAPI.deletarVisitor(visitante.id).success(function(data){
        $scope.consulta.page = 1;
        $scope.pesquisaVisitante();
      })
   }else{
      var modalInstance = $uibModal.open({
      templateUrl: 'views/modais/cadastrarVisitante.html',
      controller: 'editarVisitanteCtrl',
      resolve: {
        visitante: function(){
          return visitante;
        }
      }
    });

     modalInstance.result.then(function (visitante) {
      if(visitante){
        visitorAPI.editarVisitor(visitante).success(function(data){
          console.log(data);
          $scope.pesquisaVisitante();
        })
      }
    });
   }
  }

  $scope.clickVisitante = function(visitante){
    var modalInstance = $uibModal.open({
      templateUrl: 'views/modais/cadastrarVisitante.html',
      controller: 'editarVisitanteCtrl',
      resolve: {
        visitante: function(){
          return visitante;
        }
      }
    });

     modalInstance.result.then(function (visitante) {
      if(visitante){
        visitorAPI.editarVisitor(visitante).success(function(data){
          console.log(data);
          $scope.pesquisaVisitante();
        })
      }
    });
  }


})

.controller('cadastrarVisitanteCtrl', function($scope, $uibModalInstance, visitorAPI){

  $scope.mostraEndereco = false;

  $scope.confirmarCadastro = function(){

    $uibModalInstance.close($scope.visitor);
  }

  $scope.consultaCep = function(){
    url = '?cep='+$scope.visitante.cep;
    visitorAPI.consultaCep(url).success(function(data){
        $scope.visitor.rua = data.logradouro;
        $scope.visitor.bairro = data.bairro;
        $scope.visitor.cidade = data.localidade;
        $scope.visitor.estado = data.uf;
      $scope.mostraEndereco = true;
    }).error(function(){
      alert("CEP inválido ou falha de conexão! Por favor, digite o endereço manualmente.");
      $scope.mostraEndereco = true;
    })
  }

  $scope.cancelar = function(){
    $uibModalInstance.dismiss('cancel');
  }

})

.controller('editarVisitanteCtrl', function($scope, $uibModalInstance, visitante, visitorAPI){
  $scope.visitor = visitante;
  $scope.mostraEndereco = true;
  
  if($scope.visitante.sexo == "F")
    $scope.feminino = true;
  else
    $scope.feminino = false;

  $scope.confirmarCadastro = function(){
    $uibModalInstance.close($scope.visitor);
  }

  $scope.cancelar = function(){
    $uibModalInstance.dismiss('cancel');
  }

  $scope.consultaCep = function(){
    url = '?cep='+$scope.visitor.cep;
    visitorAPI.consultaCep(url).success(function(data){
      $scope.visitor.rua = data.logradouro;
      $scope.visitor.bairro = data.bairro;
      $scope.visitor.cidade = data.localidade;
      $scope.visitor.estado = data.uf;
    })
  }

})

.controller('passarDadosCtrl', function($scope, visitorAPI, $http){


  
    $http.get('/paginaVelho?page=12').success(function(data){
      $scope.oldVisitor = data.data;
      $scope.oldVisitor.forEach(function(v){

        if(v.id > 5183){
          $scope.visitante = {};
          $scope.visitante.name = v.name;
          $scope.visitante.cpf = v.cpf.replace(/\.|-/g, "");
          $scope.visitante.rg = v.rg;
          $scope.visitante.phone = v.phone.replace(/\(|\)|-/g, "");
          $scope.visitante.status = v.status;
          visitorAPI.saveVisitor($scope.visitante).success(function(data){
         
          })
        }
      });
    })

})