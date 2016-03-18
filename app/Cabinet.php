<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cabinet extends Model
{
    public function visitor(){
    	return $this->hasOne('App\Visitor');
    }
}
