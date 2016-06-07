<?php
//Controlador que persiste os dados da tabela cabinets.
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Cabinet;

use Carbon\Carbon;

use Illuminate\Support\Facades\Auth;

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
		$usuario = Auth::user();
		if($usuario->tipo == 'admin'){
	        $cabinet = $request->all();
	        date_default_timezone_set('America/Sao_Paulo');
			$data_hora = date('Y-m-d H:i');
	        $cabinet['data_hora'] = $data_hora;
			$Cabinet = Cabinet::create($cabinet);
			return $Cabinet;
		}	
			$error['error'] = true;
			$error['msg'] = 'Você não tem permissão para criar armários';
			return $error;
	}
 
	/**
	 * Método PUT
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request) {
		$Cabinet = Cabinet::find($id);
		$Cabinet->status = $request['status'];
		$Cabinet->visitor_id = $request['visitor_id'];
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
