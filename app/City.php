<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    public function state(){
    	return $this->hasOne('App\State');
    }

    public function user(){
    	return $this->belongsTo('App\User');
    }

}
