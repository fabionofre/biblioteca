<?php

use Illuminate\Http\Request;


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

Route::resource('api/v1.0/oldVisitor', 'oldVisitorController');
Route::resource('api/v1.0/Visitor', 'VisitorController'); 


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
	
  Route::get('/paginaVisitor', function (Request $request) {
 
    //Limite
    $limit = $request->get('limit', 5);
 
    //Order
    $order = $request->get('order', 'name');

    //Filtro
    $filtro = $request->get('filtro', "");

    //Ativo
    $ativo = $request->get('ativos', '1');
    
    
    if($ativo){
      //Realiza a paginação apenas com visitantes ativos
      return \App\Visitor::where('name', 'like', $filtro)->where('status', '=', '1')->orWhere('cpf', 'like', $filtro)->where('status', '=', '1')->orderBy($order)->paginate($limit);
    }else{
      //Realiza a paginação com todos os visitantes, inclusive os inativos
      return \App\Visitor::where('name', 'like', $filtro)->orWhere('cpf', 'like', $filtro)->orderBy('status', 'desc')->orderBy($order)->paginate($limit);
    }

});
});

Route::get('/paginaVelho', function(Request $request){
  $limit = 500;
  return \App\oldVisitor::where('status', '=', '1')->paginate($limit);
});

Route::get('/pegaCep', function(Request $request){
  $cep = $request->get('cep', 0);

  $json_file = file_get_contents(
     "https://viacep.com.br/ws/".$cep."/json/");

  $json_str = json_decode($json_file, true);

  $itens = $json_str;

  return $itens;


});

Route::group(['middleware' => ['web', 'auth.armario']], function() {
	Route::resource('api/v1.0/Cabinet', 'CabinetController');
});
