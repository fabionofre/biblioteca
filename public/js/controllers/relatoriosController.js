angular.module('biblioteca')

.controller('relatoriosCtrl', function($scope, relatoriosAPI) {

	var hoje = new Date();

	var mes = hoje.getMonth() + 1;

	var ano = hoje.getFullYear();

	var url;

	$scope.filtroData = {};
	// $scope.filtroData.ano1 = '2016';
	// $scope.filtroData.ano2 = '2017';
	// $scope.filtroData.mes1 = '11';
	// $scope.filtroData.mes2 = '02';
	// $scope.filtroData.dia1 = '01';
	// $scope.filtroData.dia2 = '01';


	var init = function(){
		$scope.buscarNumVisitantes();
	}



	$scope.buscarNumVisitantes = function() {
		if(!$scope.filtroData.ano1){
			url = '?ano='+ano;
			url += '&mes='+mes;
			url += '&mes2='+(mes == 12 ? 01 : mes+1);
			url += '&ano2='+(mes == 12 ? ano+1 : ano);
		}else{
			url = '?ano=' + $scope.filtroData.ano1;
			url += '&mes=' + $scope.filtroData.mes1;
			url += '&dia=' + $scope.filtroData.dia1;
			url += '&ano2=' + $scope.filtroData.ano2;
			url += '&mes2=' + $scope.filtroData.mes2;
			url += '&dia2=' + $scope.filtroData.dia2;
		}
		console.log(url);
		relatoriosAPI.buscaPorData(url).success(function(data){
			console.log(data);
			if(!$scope.filtroData.ano1){
				$scope.visitantesMes = data.resultado;
			}else{
				$scope.totalVisitantes = data.resultado;
			}
		});
	}

	init();

});