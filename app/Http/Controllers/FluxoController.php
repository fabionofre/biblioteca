<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Fluxo;

use App\Http\Requests;

class FluxoController extends Controller
{

    public function index() {
 
		$fluxo = Fluxo::all();
		return $fluxo;
	}
 
	/**
	 * Método POST
	 *
	 * @return Response
	 */
	public function store(Request $request) {
		$fluxo['num_visitantes'] = $request['num_visitantes'];
		$Fluxo = Fluxo::create($fluxo);
		return $Fluxo;
	}
 
	/**
	 * Método PUT
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request) {
		$fluxo = Fluxo::find($id);
		$fluxo->num_visitantes = $request['num_visitantes'];
		$fluxo->save();
 
		return $fluxo;
	}
 
	/**
	 * Método DELETE
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id) {
		$fluxo = Fluxo::find($id);
		$fluxo->status = 0;
		$fluxo->save();

		return $fluxo;
	}

	public function show($id) {
		$fluxo = Fluxo::find($id);
		return $fluxo;
	}
}
