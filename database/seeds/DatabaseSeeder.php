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
        /*for($i = 1; $i <= 90; ++$i){
           Cabinet::create([
                'data_hora' => $date,
                'status' => 3
            ]);
        }*/
    }

}
