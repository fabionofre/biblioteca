@extends('layouts.app')

@section('content')
<div class="container" ng-app="biblioteca" ng-controller="usuarioCtrl">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Registrar</div>
                <div class="panel-body">
                    <ng-form name="formRegistrar" class="form-horizontal" role="form" ng-submit="registrar();">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Nome</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control" name="name" ng-model="user.name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Usuário</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control" name="usuario" ng-model="user.email">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Senha</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password" ng-model="user.password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Confirmar Senha</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="confirmar_senha" ng-model="confirmarSenha">
                            </div>
                        </div>
                        
                        <div class="form-group">                       
                            <label class="col-md-4 control-label">Telefone</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="telefone" ng-model="user.phone">
                            </div>
                        </div>
                        <div class="form-group">                       
                            <label class="col-md-4 control-label">Tipo</label>
                            <div class="col-md-6">
                                <select name="tipo"  class="form-control" ng-model="user.tipo">
                                    <option value="1">Administrador</option>
                                    <option value="2">Atendente</option>
                                    <option value="3">Coordenador</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary" ng-click="registrar();">
                                    <i class="fa fa-btn fa-user"></i>Registrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="js/angular.min.js"></script>
<script src="js/app.js"></script>
<script src="js/controllers/usuarioModulo.js"></script>
<script src="js/services/usuarioAPIService.js"></script>
<script src="js/configs/configValue.js"></script>
@endsection