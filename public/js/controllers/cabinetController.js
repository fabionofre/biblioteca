//Criação de um controlador no módulo biblioteca para os armários.
angular.module('biblioteca')

.controller('cabinetCtrl', function($scope, cabinetAPI, $uibModal) {
	
	var _carregarArmarios = function () {
		cabinetAPI.buscarCabinets().success(function(data, status, headers, config) {
			$scope.cabinets = data;
			console.log($scope.cabinets);
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
    
    

})

.controller('modalArmarioCtrl', function($scope, $uibModalInstance, armarioId){
   
   $scope.armarioId = armarioId;
   
   $scope.ok = function () {
    $uibModalInstance.close();
   };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
   
});