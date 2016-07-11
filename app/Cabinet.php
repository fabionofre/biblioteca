<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cabinet extends Model
{
    
     protected $fillable = [
        'visitor_id', 'status'
     ];
    
    public function visitor(){
    	return $this->hasOne('App\Visitor');
    }
}
