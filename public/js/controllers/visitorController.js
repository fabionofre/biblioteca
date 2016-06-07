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
          }else{
            visitante.classe = 'fa fa-repeat';
            visitante.title = 'Ativar';
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


  $scope.desativarVisitante = function(id){
  	visitorAPI.deletarVisitor(id).success(function(data){
      $scope.consulta.page = 1;
      $scope.pesquisaVisitante();
    })
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

  $scope.confirmarCadastro = function(){
    $uibModalInstance.close($scope.visitante);
  }

  $scope.consultaCep = function(){
    url = '?cep='+$scope.visitante.cep;
    visitorAPI.consultaCep(url).success(function(data){
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

.controller('editarVisitanteCtrl', function($scope, $uibModalInstance, visitante, visitorAPI){
  $scope.visitante = visitante;
  $scope.mostraEndereco = true;

  console.log($scope.visitante.sexo);
  
  if($scope.visitante.sexo == "F")
    $scope.feminino = true;
  else
    $scope.feminino = false;

  $scope.confirmarCadastro = function(){
    $uibModalInstance.close($scope.visitante);
  }

  $scope.cancelar = function(){
    $uibModalInstance.dismiss('cancel');
  }

    $scope.consultaCep = function(){
    visitorAPI.consultaCep($scope.visitante.cep).success(function(data){
      $scope.visitante.rua = data.logradouro;
      $scope.visitante.bairro = data.bairro;
      $scope.visitante.cidade = data.localidade;
      $scope.visitante.estado = data.uf;
    })
  }

})

.controller('passarDadosCtrl', function($scope, visitorAPI, $http){

  $http.get('/api/v1.0/oldVisitor').success(function(data){
    $scope.oldVisitor = data;
    $scope.oldVisitor.forEach(function(v){
    $scope.visitante = {};
    $scope.visitante.name = v.name;
    $scope.visitante.cpf = v.cpf.replace(/\.|-/g, "");
    $scope.visitante.rg = v.rg;
    $scope.visitante.phone = v.phone.replace(/\(|\)|-/g, "");
    $scope.visitante.status = v.status;
    visitorAPI.saveVisitor($scope.visitante).success(function(data){

    })
  });
  })

  // $scope.teste = "(68)9203-8448";
  // remove = /\(|\)|-/g;
  // console.log($scope.teste);
  // $scope.teste2 = $scope.teste.replace(/\(|\)|-/g, "");
  // console.log($scope.teste2); 

})