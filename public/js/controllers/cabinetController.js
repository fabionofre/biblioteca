//Criação de um controladore no módulo biblioteca para os armários.
angular.module('biblioteca')

.controller('cabinetCtrl', function($scope, cabinetAPI) {
	
	$scope.carregarArmarios = function () {
		cabinetAPI.buscarCabinets().success(function(data, status, headers, config) {
			$scope.cabinets = data;
			console.log($scope.cabinets);
		});
	}
    
    $scope.botaoChevron = function(cabinetBtn){
                cabinetBtn = !cabinetBtn;
                console.log(cabinetBtn);
                return cabinetBtn;
    }

/*	$scope.abrirCabinet = function(id){
		cabinetAPI.buscarCabinet(id).success(function(data){
			console.log(data);
		});
	}*/

	$scope.carregarArmarios();

/*	 $scope.modalCabinet = function () {

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
  };*/

});

/*angular.module('biblioteca')

.controller('modalCabinetCtrl', function($scope, $uibModalInstance){
	$scope.ok = function () {
    	$uibModalInstance.close();
  	};

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});*/