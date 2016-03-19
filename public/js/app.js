angular.module('biblioteca', ['ui.bootstrap'], function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});