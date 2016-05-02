<?php

use Illuminate\Database\Seeder;
use App\Cabinet;
use App\State;
use App\City;
use App\Visitor;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserTableSeeder::class);
        date_default_timezone_set('America/Sao_Paulo');
		$date = date('Y-m-d H:i');
        Cabinet::create([
        	'data_hora' => $date,
            'status' => 3,
            'visitor_id' => 1
        ]);
        /*Visitor::create([
            'name' => 'Fábio',
            'cpf' => '2839139131',
            'rg' => '2321313',
            'phone'=> '9976873',
            'status' => 1,
            'rua' => 'Rio de Janeiro',
            'numero' => '123',
            'cep' => '6990000',
            'bairro' => 'kappa',
            'cidade_id' => 1
        ]);*/
    }

}
