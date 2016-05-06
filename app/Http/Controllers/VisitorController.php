<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Visitor;

class VisitorController extends Controller
{
    /**
	 * Método GET
	 *
	 * @return Response
	 */
	public function index() {
 
		$Visitor = Visitor::all();
		return $Visitor;
	}
 
	/**
	 * Método POST
	 *
	 * @return Response
	 */
	public function store(Request $request) {
		$Visitor = Visitor::create($request->all());
		return $Visitor;
	}
 
	/**
	 * Método PUT
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request) {
		$Visitor = Visitor::find($id);
		// $User->'campoASerEditado' = $request['campo']; EXEMPLO
		$Visitor->save();
 
		return $Visitor;
	}
 
	/**
	 * Método DELETE
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id) {
		$Visitor = Visitor::find($id);
		$Visitor->status = 0;
		$Visitor->save();

		return $Visitor;
	}

	public function show($id) {
		$Visitor = Visitor::find($id);
		return $Visitor;
	}
}
