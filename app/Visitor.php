<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{

	protected $fillable = [
        'name', 'cpf', 'rg', 'phone', 'rua', 'numero', 'cep', 'bairro', 'cidade','estado', 'user_id', 'status', 'data_nascimento'
    ];

	public function user(){
    	return $this->hasOne('App\User');
    }

    public function city(){
    	return $this->hasOne('App\City');
    }

}
