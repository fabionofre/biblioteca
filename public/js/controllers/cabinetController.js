//Criação de um controlador no módulo biblioteca para os armários.
angular.module('biblioteca')

.controller('cabinetCtrl', function($scope, cabinetAPI, $uibModal) {
    
  $scope.filtro = '';

	var _carregarArmarios = function () {
		cabinetAPI.buscarCabinets().success(function(data, status, headers, config) {
			$scope.cabinets = data;
            $scope.cabinets.forEach(function(cabinet) {
                if(cabinet.visitor_id){
                    cabinet.classe = 'btn btn-danger btn-md btn-block';
                    cabinet.title = 'Armário ocupado';
                    cabinet.status = 'em_uso';
                }else{
                  if(cabinet.status == 'livre'){
                      cabinet.classe = 'btn btn-success btn-md btn-block';
                      cabinet.title = 'Armário livre';
                  }else if(cabinet.status == 'em_uso'){
                      cabinet.classe = 'btn btn-danger btn-md btn-block';
                      cabinet.title = 'Armário ocupado';
                  }else{
                      cabinet.classe = 'btn btn-warning btn-md btn-block';
                      cabinet.title = 'Armário quebrado';
                      cabinet.status = 'quebrado';
                  }
              }
            })
		});
	}

	_carregarArmarios();
    
    $scope.abrirArmario = function(id){
      cabinetAPI.buscarCabinet(id).success(function(data){
        if(data.visitor_id != null){
          var modalInstance = $uibModal.open({
              templateUrl: 'views/modais/modalArmario.html',
              controller: 'modalArmarioCtrl',
              resolve: {
                  armario: function(){
                      return data;
                  }
              }
          });

           modalInstance.result.then(function (cabinet) {
            if(cabinet){
              cabinet.visitor_id = null;
              cabinet.status = 'livre';
              cabinetAPI.editarCabinet(cabinet.id, cabinet).success(function(data, status){
                _carregarArmarios();
              })
            }   
           });
        }else{
          var modalInstance = $uibModal.open({
              templateUrl: 'views/modais/emprestarArmario.html',
              controller: 'modalEmprestarArmarioCtrl',
              resolve: {
                  armario: function(){
                      return data;
                  }
              }
          });
          modalInstance.result.then(function (retornoModal) {
            if(retornoModal){
              _carregarArmarios();
            }
          });
        }
      });
        
          
    }

    $scope.adicionarArmario = function(){
      var modalInstance = $uibModal.open({
            templateUrl: 'views/modais/modalAddArmario.html',
            controller: 'modalAddArmarioCtrl',
        });
        
      modalInstance.result.then(function (retornoModal) {
        if(retornoModal){
            cabinet = {};
            cabinet.status = 3;
            cabinet.visitor_id = null; 
            cabinetAPI.saveCabinet(cabinet).success(function(data) {
                if(!data.error)
                  _carregarArmarios();
                else
                  alert('Você não tem permissão para criar armários!');
            })
        }
      });
    };
        
})

.controller('modalArmarioCtrl', function($scope, $uibModalInstance, armario, cabinetAPI, visitorAPI){
   
   $scope.cabinet = armario;
   
   visitorAPI.buscaVisitor($scope.cabinet.visitor_id).success(function(data){
      $scope.visitor = data;
    });



   
   $scope.liberar = function () {
    $uibModalInstance.close($scope.cabinet);
   };

  $scope.cancelar = function () { 
    $uibModalInstance.dismiss('cancel');
  };
   
})

.controller('modalAddArmarioCtrl', function($scope, $uibModalInstance){
   
   $scope.ok = function () {
    $uibModalInstance.close(true);
   };

  $scope.cancelar = function () {
    $uibModalInstance.close(false);
  };
   
})

.controller('modalEmprestarArmarioCtrl', function($scope, $uibModal, $uibModalInstance, armario, visitorAPI){

  $scope.cabinet = armario;
  $scope.visitantes = {};
  $scope.mostrarTabela = false;

  $scope.consulta = {
    order: 'name',
    limit: 5,
    page: 1
  };

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
    $scope.botaoApertado = true;
    visitorAPI.paginaVisitor(url).success(function(data){
      console.log(data);
      $scope.total = data.total;
      $scope.visitantes = data.data;
      if(data.total == 0)
        $scope.mostrarTabela = false;
      else
        $scope.mostrarTabela = true;
    })

  }

  $scope.clickVisitante = function(visitante){
    var modalInstance = $uibModal.open({
      templateUrl: 'views/modais/confirmarEmprestimo.html',
      controller: 'confirmarEmprestimoCtrl',
      resolve: {
          visitante: function(){
            return visitante;
          },
          armario : function(){
            return $scope.cabinet;
          }
      }
    });

     modalInstance.result.then(function (retornoModal) {
          if(retornoModal)
            $uibModalInstance.close(true);  
     });
  }

  $scope.cadastrarVisitante = function(){
    var modalInstance = $uibModal.open({
      templateUrl: 'views/modais/cadastrarVisitante.html',
      controller: 'cadastrarVisitanteCtrl',
      resolve: {
        armario : function(){
          return armario;
        }
      }
    });

     modalInstance.result.then(function (visitante) {
      if(visitante){
        visitante.status = 1;
        visitante.cidade_id = 1;
        visitorAPI.saveVisitor(visitante).success(function(data){
          
        })
      }
    });
  }

  $scope.emprestar = function (){
    $uibModalInstance.close($scope.cabinet);
  };

  $scope.cancelar = function () {
    $uibModalInstance.close(false);
  };

})

.controller('confirmarEmprestimoCtrl', function($scope, $http, $uibModalInstance, visitante, armario, cabinetAPI){
  $scope.visitor = visitante;
  $scope.cabinet = armario;
  $scope.cabinet.visitor_id = $scope.visitor.id;

  $scope.emprestar = function(){
    cabinetAPI.editarCabinet($scope.cabinet.id, $scope.cabinet).success(function(data){
      $uibModalInstance.close(true);
    }).error(function(){
      $uibModalInstance.close(false);
      alert("O visitante "+$scope.visitor.name+" já possui uma chave");
    })
  }

  $scope.cancelar = function(){
    $uibModalInstance.close(false);
  }
})

.controller('cadastrarVisitanteCtrl', function($scope, $http, $uibModalInstance, armario){ 

  $scope.confirmarCadastro = function(){
    $uibModalInstance.close($scope.visitante);
    /*var dataNasc = $scope.visitante.data_nascimento;
    var dia = dataNasc.getDate();
    var mes = dataNasc.getMonth();
    var ano = dataNasc.getFullYear();
    $scope.visitante.data_nascimento = dia + '/' + (++mes) + '/' + ano;*/
  }

  $scope.cancelar = function(){
    $uibModalInstance.dismiss('cancel');
  }

})