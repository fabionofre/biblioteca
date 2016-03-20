<?php
//Controlador que persiste os dados da tabela cabinets.
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Cabinet;

class CabinetController extends Controller
{
    /**
	 * Método GET
	 *
	 * @return Response
	 */
	public function index() {
 		
		$Cabinet = Cabinet::all();
		return $Cabinet;
	}
 
	/**
	 * Método POST
	 *
	 * @return Response
	 */
	public function store(Request $request) {
		$Cabinet = Cabinet::create($request->all());
		return $Cabinet;
	}
 
	/**
	 * Método PUT
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request) {
		$Cabinet = User::find($id);
		// $Cabinet->'campoASerEditado' = $request['campo']; EXEMPLO
		$Cabinet->save();
 
		return $Cabinet;
	}
 
	/**
	 * Método DELETE
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id) {
		$Cabinet = Cabinet::find($id);
		$Cabinet->status = 0;
		$Cabinet->save();
		return $Cabinet;
	}	

	public function show($id) {
		$Cabinet = Cabinet::find($id);
		return $Cabinet;
	}
 
}
