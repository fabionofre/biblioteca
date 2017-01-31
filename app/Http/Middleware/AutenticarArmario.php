<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;

use Closure;

class AutenticarArmario
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
        if($usuario && ($usuario->tipo == 'atd' || $usuario->tipo == 'admin' || $usuario->tipo == 'coord'))
            return $next($request);
        return Redirect('/welcome');
    }
}
