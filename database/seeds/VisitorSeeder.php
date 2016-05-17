<?php

use Illuminate\Database\Seeder;

use App\Visitor;

class VisitorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

    	date_default_timezone_set('America/Sao_Paulo');
		$date = date('Y-m-d H:i');

		for($i = 1; $i <= 1000; ++$i){
	        Visitor::create([
	        	'name' => 'Teste',
	        	'cpf' => '123456'+$i,
	        	'rg' => '123456',
	        	'phone' => '123456',
	        	'status' => '1',
	        	'rua' => 'Aleatória',
	        	'bairro' => 'Aleatório',
	        	'numero' => '123',
	        	'data_nascimento' => $date,
	        	'cidade' => 'Rio Branco',
	        	'estado' => 'AC',
	        	'user_id' => 1
	        ]);
    	}
    }
}
