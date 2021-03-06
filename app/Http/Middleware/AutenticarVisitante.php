<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth;

class AutenticarVisitante
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {       
            $usuario = Auth::user();
            if($usuario && ($usuario->tipo == 'admin' || $usuario->tipo == 'atd' || $usuario->tipo == 'coord'))
                return $next($request);
            return Redirect('/welcome');
    }
}
