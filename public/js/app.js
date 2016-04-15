angular.module('biblioteca', ['ngRoute', 'ui.bootstrap'], function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});