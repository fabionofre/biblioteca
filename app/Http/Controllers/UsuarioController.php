<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use Request;

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
	public function store() {
		$User = User::create(Request::all());
		return $User;
	}
 
	/**
	 * Método PUT
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id) {
		$User = User::find($id);
		// $User->'campoASerEditado' = Request::input('done'); EXEMPLO
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
 
}
