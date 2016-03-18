<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blocked_visitor extends Model
{

    public function visitor(){
    	return $this->hasOne('App\Visitor');
    }

    public function user(){
    	return $this->hasOne('App\User');
    }
    
}
