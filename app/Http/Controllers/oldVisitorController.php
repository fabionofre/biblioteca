<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\oldVisitor;

class oldVisitorController extends Controller
{
    /**
	 * Método GET
	 *
	 * @return Response
	 */
	public function index() {
 
		$Visitor = oldVisitor::all();
		return $Visitor;
	}
 
	/**
	 * Método POST
	 *
	 * @return Response
	 */
	public function store(Request $request) {
		$request['user_id'] = Auth::user()->id;
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
		$Visitor->status = !$Visitor->status;//Se estiver ativo, desativa o visitante. Se desativado, ativa.
		$Visitor->save();

		return $Visitor;
	}

	public function show($id) {
		$Visitor = Visitor::find($id);
		return $Visitor;
	}

}
