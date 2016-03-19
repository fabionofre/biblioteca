@extends('layouts.app')
@section('css')
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
@endsection
@section('content')
<div class="container" ng-app="biblioteca" ng-controller="cabinetCtrl">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Armários</div>
                <div class="panel-body">
                    <div class="row" ng-repeat="cabinet in cabinets">
                            <div class="col-md-1"><a ng-click="modalCabinet();" style="padding-bottom: 10px;" class="btn btn-success btn-large btn-block"><%cabinet.id%></a> 
                        </div>     
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('scripts')
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
<script src="js/ui-bootstrap-1.2.4.min.js"></script>
<script src="js/app.js"></script>
<script src="js/controllers/cabinetController.js"></script>
<script src="js/services/cabinetAPIService.js"></script>
<script src="js/configs/configValue.js"></script>
@endsection
@section('modals')
@include('modalCabinet')
@endsection

