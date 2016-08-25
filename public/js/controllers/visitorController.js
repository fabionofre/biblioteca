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

.controller('cadastrarVisitanteCtrl', function($scope, $uibModalInstance, $http, visitorAPI){

  $scope.mostraEndereco = false;
  $scope.visitante = {};
  $scope.estrangeiro = {};
  $scope.visitante.sexo = 2;
  $scope.estrangeiro.sexo = 2;
  $scope.abaVisitante = true;
  $scope.estrangeiro.pais_origem;
  $scope.classeAbaV = 'active';
  $scope.classeTabV = 'tab-pane active';
  var paises;

  $scope.toggleAba = function(){
    $scope.abaVisitante = !$scope.abaVisitante;
    if($scope.abaVisitante){
      $scope.classeAbaV = 'active';
      $scope.classeAbaE = '';
      $scope.classeTabV = 'tab-pane active';
      $scope.classeTabE = 'tab-pane';
      $scope.visitante.cpf = '';
      $scope.estrangeiro = $scope.visitante;
    }
    else{
      $scope.classeAbaE = 'active';
      $scope.classeAbaV = '';
      $scope.classeTabE = 'tab-pane active';
      $scope.classeTabV = 'tab-pane';
      $scope.visitante.pais_origem = 'brasileira';
      $scope.visitante = $scope.estrangeiro;
    }
  }

  $http.get('js/pais_origems.json').success(function(data){
      $scope.paises = data;
  });

  $scope.confirmarCadastro = function(){
    if($scope.estrangeiro.name){
      $scope.estrangeiro.pais_origem = $scope.estrangeiro.pais_origem.gentilico;
      $uibModalInstance.close($scope.estrangeiro);
    }
    else{
      $scope.visitante.pais_origem = 'brasileira';
      $uibModalInstance.close($scope.visitante);
    }
  }

  $scope.consultaCep = function(){
    if($scope.visitante.cep)
      url = '?cep='+$scope.visitante.cep;
    else
      url = '?cep='+$scope.estrangeiro.cep;
    visitorAPI.consultaCep(url).success(function(data){
      if($scope.visitante.cep){
        $scope.visitante.rua = data.logradouro;
        $scope.visitante.bairro = data.bairro;
        $scope.visitante.cidade = data.localidade;
        $scope.visitante.estado = data.uf;
      }
      else{
        $scope.estrangeiro.rua = data.logradouro;
        $scope.estrangeiro.bairro = data.bairro;
        $scope.estrangeiro.cidade = data.localidade;
        $scope.estrangeiro.estado = data.uf;
      }

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

.controller('editarVisitanteCtrl', function($scope, $uibModalInstance, $http, visitante, visitorAPI){
  $scope.mostraEndereco = true;
  $scope.visitante = {};
  $scope.estrangeiro = {};
  if(!visitante.sexo || visitante.sexo == 'F')
    visitante.sexo = 2;
  else
    visitante.sexo = 1;

  if(visitante.pais_origem != 'brasileira' && visitante.data_nascimento){
    $scope.estrangeiro = visitante;
    $scope.abaVisitante = false;
    $scope.classeAbaE = 'active';
    $scope.classeTabE = 'tab-pane active';
  }else{
    $scope.abaVisitante = true;
    $scope.classeAbaV = 'active';
    $scope.classeTabV = 'tab-pane active';
    $scope.visitante = visitante;
  }

   $http.get('js/pais_origems.json').success(function(data){
      $scope.paises = [];
      data.forEach(function(pais){
        $scope.paises.push(pais.nome_pais);
      });
    });

  
  $scope.confirmarCadastro = function(){
    if($scope.visitante.cpf){
      $scope.visitante.pais_origem = 'brasileira';
      $uibModalInstance.close($scope.visitante);
    }
    else{
      $uibModalInstance.close($scope.estrangeiro);
    }

  }

  $scope.cancelar = function(){
    $uibModalInstance.dismiss('cancel');
  }

   $scope.toggleAba = function(){
    $scope.abaVisitante = !$scope.abaVisitante;
    if($scope.abaVisitante){
      $scope.classeAbaV = 'active';
      $scope.classeAbaE = '';
      $scope.classeTabV = 'tab-pane active';
      $scope.classeTabE = 'tab-pane';
      $scope.visitante = $scope.estrangeiro;
    }
    else{
      $scope.classeAbaE = 'active';
      $scope.classeAbaV = '';
      $scope.classeTabE = 'tab-pane active';
      $scope.classeTabV = 'tab-pane';
      $scope.visitante.pais_origem = 'brasileira';
      $scope.visitante.cpf = '';
      $scope.estrangeiro = $scope.visitante;
      console.log("visitante:"+$scope.visitante);
      console.log("estrangeiro:"+$scope.estrangeiro);
    }
  }

  $scope.consultaCep = function(){
    if($scope.visitante.cep)
      url = '?cep='+$scope.visitante.cep;
    else
      url = '?cep='+$scope.estrangeiro.cep;
    visitorAPI.consultaCep(url).success(function(data){
      if($scope.visitante.cep){
        $scope.visitante.rua = data.logradouro;
        $scope.visitante.bairro = data.bairro;
        $scope.visitante.cidade = data.localidade;
        $scope.visitante.estado = data.uf;
      }
      else{
        $scope.estrangeiro.rua = data.logradouro;
        $scope.estrangeiro.bairro = data.bairro;
        $scope.estrangeiro.cidade = data.localidade;
        $scope.estrangeiro.estado = data.uf;
      }
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