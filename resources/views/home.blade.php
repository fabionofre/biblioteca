@extends('layouts.app')
@section('css')
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
@endsection
@section('content')
<div class="container" ng-controller="cabinetCtrl">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Armários</div>
                <div class="panel-body row">
                    <div ng-repeat="cabinet in cabinets">
                            <div class="col-lg-4">
                        <div class="portlet portlet-default">
                            <div class="portlet-heading">
                                <div class="portlet-title">
                                    <h4>Armário : <%cabinet.id%></h4>
                                </div>
                                <div class="portlet-widgets">
                                    <span class="label green"><%cabinet.status%></span>
                                    <span class="divider"></span>
                                    <a data-toggle="collapse" data-parent="#accordion" href="#defaultPortlet<%cabinet.id%>"><i class="fa fa-chevron-down"></i></a>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div id="defaultPortlet<%cabinet.id%>" class="panel-collapse collapse in">
                                <div class="portlet-body">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis tempus libero. Aliquam et dui at augue aliquet gravida at at est. Curabitur mattis sem sed dolor sagittis blandit. Nulla facilisi. Praesent eget nibh nisl. Sed .</p>
                                </div>
                            </div>
                            <div class="portlet-footer">
                                Recepcionista: xxxx
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@endsection
@section('scripts')
<script src="js/ui-bootstrap-1.2.4.min.js"></script>
<script src="js/controllers/cabinetController.js"></script>
<script src="js/services/cabinetAPIService.js"></script>
<script src="js/configs/configValue.js"></script>
@endsection

