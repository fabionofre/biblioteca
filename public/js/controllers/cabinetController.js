//Criação de um controlador no módulo biblioteca para os armários.
angular.module('biblioteca')

.controller('cabinetCtrl', function($scope, cabinetAPI, $uibModal) {
    
    $scope.filtro = '';
	
	var _carregarArmarios = function () {
		cabinetAPI.buscarCabinets().success(function(data, status, headers, config) {
			$scope.cabinets = data;
            $scope.cabinets.forEach(function(cabinet) {
                if(cabinet.visitor_id && cabinet.visitor_id != 1){
                    cabinet.classe = 'btn btn-danger btn-large btn-block';
                    cabinet.title = 'Armário ocupado';
                    cabinet.status = 'em_uso';
                }else{
                  if(cabinet.status == 'livre' && cabinet.visitor_id == 1){
                      cabinet.classe = 'btn btn-success btn-large btn-block';
                      cabinet.title = 'Armário livre';
                  }else if(cabinet.status == 'em_uso'){
                      cabinet.classe = 'btn btn-danger btn-large btn-block';
                      cabinet.title = 'Armário ocupado';
                  }else{
                      cabinet.classe = 'btn btn-warning btn-large btn-block';
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
        if(data.visitor_id != 1){
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
              cabinet.visitor_id = 1;
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
          modalInstance.result.then(function (cabinet) {
            if(cabinet){
              cabinet.visitor_id = 2;//receber este valor do formulário;
              cabinet.status = 'em_uso';
              cabinetAPI.editarCabinet(cabinet.id, cabinet).success(function(){
                  _carregarArmarios();
              })
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
            cabinet.visitor_id = 1; 
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

  $scope.cancel = function () {
    $uibModalInstance.close(false);
  };
   
})

.controller('modalEmprestarArmarioCtrl', function($scope, $uibModalInstance, armario){

  $scope.cabinet = armario;
  
  $scope.emprestar = function (){
    $uibModalInstance.close($scope.cabinet);
  };

  $scope.cancelar = function () {
    $uibModalInstance.close(false);
  };

});