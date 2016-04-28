//Criação de um controlador no módulo biblioteca para os armários.
angular.module('biblioteca')

.controller('cabinetCtrl', function($scope, cabinetAPI, $uibModal) {
	
	var _carregarArmarios = function () {
		cabinetAPI.buscarCabinets().success(function(data, status, headers, config) {
			$scope.cabinets = data;
            $scope.cabinets.forEach(function(cabinet) {
                if(cabinet.status == 'livre'){
                    cabinet.classe = 'btn btn-success btn-large btn-block';
                    cabinet.title = 'Armário livre';
                }else if(cabinet.status == 'em_uso'){
                    cabinet.classe = 'btn btn-danger btn-large btn-block';
                    cabinet.title = 'Armário ocupado';
                }else{
                    cabinet.classe = 'btn btn-warning btn-large btn-block';
                    cabinet.title = 'Armário quebrado';
                }
            })
		});
	}

	_carregarArmarios();
    
    $scope.abrirArmario = function(id){
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modalArmario.html',
            controller: 'modalArmarioCtrl',
            resolve: {
                armarioId: function(){
                    return id;
                }
            }
        });
    }

    $scope.adicionarArmario = function(){
      var modalInstance = $uibModal.open({
            templateUrl: 'views/modalAddArmario.html',
            controller: 'modalAddArmarioCtrl',
        });
        
      modalInstance.result.then(function (retornoModal) {
        if(retornoModal)
            cabinet = {};
            cabinet.status = 3;
            cabinet.visitor_id = 1; 
            cabinetAPI.saveCabinet(cabinet).success(function(data) {
                _carregarArmarios();
            })
      });
    };
        
})

.controller('modalArmarioCtrl', function($scope, $uibModalInstance, armarioId, cabinetAPI){
   
   $scope.armarioId = armarioId;
   
   cabinetAPI.buscarCabinet(armarioId).success(function(data){
       console.log(data); 
   });
   
   $scope.ok = function () {
    $uibModalInstance.close();
   };

  $scope.cancel = function () {
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
   
});