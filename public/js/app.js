angular.module('biblioteca', ['ngRoute', 'ui.bootstrap', 'ui.utils.masks', 'idf.br-filters'], function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});