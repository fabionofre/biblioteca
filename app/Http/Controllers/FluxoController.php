<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Fluxo;
use App\Http\Requests;

class FluxoController extends Controller
{


    public function index(Request $request) {

    	$ano1 = $request->get('ano');
    	$mes1 = $request->get('mes');
    	$dia1 = $request->get('dia', '01');

    	$ano2 = $request->get('ano2', $ano1);
    	$mes2 = $request->get('mes2');
    	$dia2 = $request->get('dia2', '01');

    	$data1 = $ano1;
    	$data1 .= "-" . $mes1;
    	$data1 .= "-" . $dia1;

    	$data2 = $ano2;
    	$data2 .= "-" . $mes2;
    	$data2 .= "-" . $dia2;


 
		$fluxo = DB::table('fluxos')
            ->select('*')
            ->where('created_at','>=', $data1)
            ->where('created_at','<=',$data2)
            ->count();
        return \Response::json(array(
                    'erro'      => false,
                    'status'    => 200,
                    'resultado' => $fluxo
                ));
	}
 
	/**
	 * Método POST
	 *
	 * @return Response
	 */
	public function store(Request $request) {
		$fluxo['visitor_id'] = $request['visitor_id'];
		$fluxo['atd_id'] = Auth::id();
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
