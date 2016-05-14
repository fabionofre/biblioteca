<?php
//Controlador que persiste os dados da tabela users.
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use Illuminate\Support\Facades\Auth;
//use Request;

class UsuarioController extends Controller
{
    /**
	 * Método GET
	 *
	 * @return Response
	 */
	public function index() {
 
		$User = User::all();
		return $User;
	}
 
	/**
	 * Método POST
	 *
	 * @return Response
	 */
	public function store(Request $request) {
		$request['password'] = bcrypt($request['password']);
		$User = User::create($request->all());
		return $User;
	}
 
	/**
	 * Método PUT
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request) {
		$User = User::find($id);
		// $User->'campoASerEditado' = $request['campo']; EXEMPLO
		$User->save();
 
		return $User;
	}
 
	/**
	 * Método DELETE
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id) {
		$User = User::find($id);
		$User->status = 0;
		$User->save();

		return $User;
	}

	public function show($id) {
		$User = User::find($id);
		return $User;
	}

	public function pegaTipo(){
    	return Auth::user();
	}
 
}
