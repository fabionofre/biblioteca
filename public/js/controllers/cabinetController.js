//Criação de dois controladores no módulo biblioteca, um para os armários e outro para um modal.
angular.module('biblioteca')

.controller('cabinetCtrl', function($scope, $uibModal, cabinetAPI) {
	
	$scope.carregarArmarios = function () {
		cabinetAPI.buscarCabinets().success(function(data, status, headers, config) {
			$scope.cabinets = data;
			console.log($scope.cabinets);
		});
	}

	$scope.abrirCabinet = function(id){
		cabinetAPI.buscarCabinet(id).success(function(data){
			console.log(data);
		});
	}

	$scope.carregarArmarios();

	 $scope.modalCabinet = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'modalCabinet.blade.php',
      controller: 'modalCabinetCtrl',
      resolve: {
        infoArmario: function () {
          return $scope.infoArmario;
        }
      }
    });

    modalInstance.result.then(function () {
    }, function () {

    });
  };

});

angular.module('biblioteca')

.controller('modalCabinetCtrl', function($scope, $uibModalInstance){
	$scope.ok = function () {
    	$uibModalInstance.close();
  	};

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});