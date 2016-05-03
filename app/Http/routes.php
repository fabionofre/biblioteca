<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/




/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {

});

Route::group(['middleware' => 'web'], function () {
   Route::auth();
   Route::get('/home', 'HomeController@index');
   Route::get('/', function () {
    	return view('welcome');
   });
   Route::get('/register', function(){
		return view('auth/register');
  	});
//    Route::get('/login', function(){
// 		return view('auth/login');
//   	});
});




Route::group(['middleware' => ['web', 'auth.admin']], function() {
	Route::resource('api/v1.0/Usuario', 'UsuarioController');
});


Route::group(['middleware' => ['web', 'auth.visitante']], function() {
	Route::resource('api/v1.0/Visitor', 'VisitorController');
});

Route::group(['middleware' => ['web', 'auth.armario']], function() {
	Route::resource('api/v1.0/Cabinet', 'CabinetController');
});
