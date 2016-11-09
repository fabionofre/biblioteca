<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Visitor;

use Illuminate\Support\Facades\Auth;


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
		// $request['user_id'] = Auth::user()->id;
		$visitor['name'] = $request['name'];
		$visitor['cpf'] = $request['cpf'];
		$visitor['rg'] = $request['rg'];
		$visitor['phone'] = $request['phone'];
		$visitor['rua'] = $request['rua'];
		$visitor['numero'] = $request['numero'];
		$visitor['cep'] = $request['cep'];
		$visitor['bairro'] = $request['bairro'];
		$visitor['data_nascimento'] = $request['data_nascimento'];
		$visitor['cidade'] = $request['cidade'];
		$visitor['estado'] = $request['estado'];
		$visitor['sexo'] = $request['sexo'];
		$visitor['pais_origem'] = $request['pais_origem'];
		$visitor['status'] = $request['status'];
		$visitor['user_id'] = Auth::id();
		$Visitor = Visitor::create($visitor);
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
		$Visitor->name = $request['name'];
		$Visitor->cpf = $request['cpf'];
		$Visitor->rg = $request['rg'];
		$Visitor->phone = $request['phone'];
		$Visitor->rua = $request['rua'];
		$Visitor->numero = $request['numero'];
		$Visitor->cep = $request['cep'];
		$Visitor->bairro = $request['bairro'];
		$Visitor->data_nascimento = $request['data_nascimento'];
		$Visitor->cidade = $request['cidade'];
		$Visitor->estado = $request['estado'];
		$Visitor->sexo = $request['sexo'];
		$Visitor->pais_origem = $request['pais_origem'];
		$Visitor->status = $request['status'];
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
		$Visitor->status = !$Visitor->status;//Se estiver ativo, desativa o visitante. Se desativado, ativa.
		$Visitor->save();

		return $Visitor;
	}

	public function show($id) {
		$Visitor = Visitor::find($id);
		return $Visitor;
	}

}
