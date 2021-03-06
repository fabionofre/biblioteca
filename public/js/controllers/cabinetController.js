//Criação de um controlador no módulo biblioteca para os armários.
angular.module('biblioteca')

.controller('cabinetCtrl', function($scope, cabinetAPI, $uibModal) {
    
  $scope.filtro = '';

  $scope.numArmarios = 90;

  var _armariosOcupados;
  var _armariosLivres;
  var _armariosQuebrados;
  var _todosArmarios;

	var _carregarArmarios = function () {
		cabinetAPI.buscarCabinets().success(function(data, status, headers, config) {
			$scope.cabinets = data;
          _armariosOcupados = 0;
          _armariosLivres = 0;
          _armariosQuebrados = 0;
          _todosArmarios = 0;
            $scope.cabinets.forEach(function(cabinet) {
                if(cabinet.visitor_id){
                    cabinet.classe = 'btn btn-danger btn-md btn-block';
                    cabinet.title = 'Armário ocupado';
                    cabinet.status = 'em_uso';
                    _armariosOcupados++;
                }else{
                  if(cabinet.status == 'livre'){
                      cabinet.classe = 'btn btn-success btn-md btn-block';
                      cabinet.title = 'Armário livre';
                      _armariosLivres++;
                  }else if(cabinet.status == 'em_uso'){
                      cabinet.classe = 'btn btn-danger btn-md btn-block';
                      cabinet.title = 'Armário ocupado';
                      _armariosOcupados++;
                  }else{
                      cabinet.classe = 'btn btn-warning btn-md btn-block';
                      cabinet.title = 'Armário quebrado';
                      cabinet.status = 'quebrado';
                      _armariosQuebrados++;
                  }
              }
              _todosArmarios++;
            })
		});
	}

	_carregarArmarios();

  setInterval(_carregarArmarios, 3000);

  $scope.funcFiltro = function(filtro){
    $scope.filtro = filtro;
    if(filtro == 'livre')
      $scope.numArmarios = _armariosLivres;
    else if(filtro == 'ocupado')
      $scope.numArmarios = _armariosOcupados;
    else if(filtro == 'quebrado')
      $scope.numArmarios = _armariosQuebrados;
    else
      $scope.numArmarios = _todosArmarios;
  }
    
    $scope.abrirArmario = function(id){
      cabinetAPI.buscarCabinet(id).success(function(data){
        if(data.visitor_id != null && data.status != 'quebrado'){
          var modalInstance = $uibModal.open({
              templateUrl: 'views/modais/modalArmario.html',
              controller: 'modalArmarioCtrl',
              resolve: {
                  armario: function(){
                      return data;
                  }
              }
          });

           modalInstance.result.then(function (cabinet) {
            if(cabinet){
              cabinet.visitor_id = null;
              cabinet.status = 'livre';
              cabinetAPI.editarCabinet(cabinet.id, cabinet).success(function(data, status){
                _carregarArmarios();
              })
            }   
           });
        }else if(data.status != 'quebrado'){
          var modalInstance = $uibModal.open({
              templateUrl: 'views/modais/emprestarArmario.html',
              controller: 'modalEmprestarArmarioCtrl',
              size: 'lg',
              resolve: {
                  armario: function(){
                      return data;
                  }
              }
          });
          modalInstance.result.then(function (retornoModal) {
            if(retornoModal){
              _carregarArmarios();
            }
          });
        }else{
          alert("Impossível emprestar armário quebrado!");
        }
      });
        
          
    }

    $scope.adicionarArmario = function(){
      var modalInstance = $uibModal.open({
            templateUrl: 'views/modais/modalAddArmario.html',
            controller: 'modalAddArmarioCtrl',
        });
        
      modalInstance.result.then(function (retornoModal) {
        if(retornoModal){
            cabinet = {};
            cabinet.status = 3;
            cabinet.visitor_id = null; 
            cabinetAPI.saveCabinet(cabinet).success(function(data) {
                if(!data.error)
                  _carregarArmarios();
                else
                  alert('Você não tem permissão para criar armários!');
            })
        }
      });
    };
        
})

.controller('modalArmarioCtrl', function($scope, $uibModalInstance, armario, cabinetAPI, visitorAPI){
   
   $scope.cabinet = armario;
   
   visitorAPI.buscaVisitor($scope.cabinet.visitor_id).success(function(data){
      $scope.visitor = data;
    });



   
   $scope.liberar = function () {
    $uibModalInstance.close($scope.cabinet);
   };

  $scope.cancelar = function () { 
    $uibModalInstance.dismiss('cancel');
  };
   
})

.controller('modalAddArmarioCtrl', function($scope, $uibModalInstance){
   
   $scope.ok = function () {
    $uibModalInstance.close(true);
   };

  $scope.cancelar = function () {
    $uibModalInstance.close(false);
  };
   
})

.controller('modalEmprestarArmarioCtrl', function($scope, $uibModal, $uibModalInstance, armario, visitorAPI, cabinetAPI){

  $scope.cabinet = armario;
  $scope.visitantes = {};
  $scope.mostrarTabela = false;

  $scope.consulta = {
    order: 'name',
    limit: 5,
    page: 1
  };

   $scope.onChange = function (page, limit) {
      $scope.consulta.page = page;
      $scope.consulta.limit = limit;
      return $scope.pesquisaVisitante();
    };

  $scope.pesquisaVisitante = function(){
    url = '?page='+$scope.consulta.page;
    url += '&ativos=0';
    url += '&limit='+$scope.consulta.limit;
    url += '&order='+$scope.consulta.order;
    url += '&filtro='+$scope.pesquisa+'%';
    $scope.botaoApertado = true;
    visitorAPI.paginaVisitor(url).success(function(data){
      console.log(data);
      $scope.total = data.total;
      $scope.visitantes = data.data;
      if(data.total == 0)
        $scope.mostrarTabela = false;
      else
        $scope.mostrarTabela = true;
    })

  }

  $scope.clickVisitante = function(visitante){
    if(visitante.status == 2){
      var modalInstance = $uibModal.open({
        templateUrl: 'views/modais/cadastrarVisitante.html',
        controller: 'editarVisitanteCtrl',//Este controlador está no arquivo visitorController.js
        resolve: {
          visitante: function(){
            return visitante;
          }
        }
      });

      modalInstance.result.then(function (visitante) {
        if(visitante){
          visitante.status = 1;
          visitorAPI.editarVisitor(visitante).success(function(data){
            console.log(data);
            var modalInstance = $uibModal.open({
              templateUrl: 'views/modais/confirmarEmprestimo.html',
              controller: 'confirmarEmprestimoCtrl',
              resolve: {
                  visitante: function(){
                    return visitante;
                  },
                  armario : function(){
                    return $scope.cabinet;
                  }
              }
            });

           modalInstance.result.then(function (retornoModal) {
                if(retornoModal)
                  $uibModalInstance.close(true);  
           });
          })
        }
      });

    }else{
      var modalInstance = $uibModal.open({
        templateUrl: 'views/modais/confirmarEmprestimo.html',
        controller: 'confirmarEmprestimoCtrl',
        resolve: {
            visitante: function(){
              return visitante;
            },
            armario : function(){
              return $scope.cabinet;
            }
        }
      });

         modalInstance.result.then(function (retornoModal) {
              if(retornoModal)
                $uibModalInstance.close(true);  
         });
    }
  }

  $scope.cadastrarVisitante = function(){
    var modalInstance = $uibModal.open({
      templateUrl: 'views/modais/cadastrarVisitante.html',
      controller: 'cadastrarVisitanteCtrl'//Este controlador está no arquivo visitorController.js
    });

     modalInstance.result.then(function (visitante) {
      if(visitante){
        visitante.status = 1;
        visitorAPI.saveVisitor(visitante).success(function(data){
          
        })
      }
    });
  }

  $scope.emprestar = function (){
    $uibModalInstance.close($scope.cabinet);
  };

  $scope.cancelar = function () {
    $uibModalInstance.close(false);
  };

   $scope.quebrar = function(cabinet){
    cabinet.status = 'quebrado';
    cabinet.visitor_id = null;
    cabinetAPI.editarCabinet(cabinet.id, cabinet).success(function(data){
      $uibModalInstance.close(true);
    })
  }

})

.controller('confirmarEmprestimoCtrl', function($scope, $uibModalInstance, visitante, armario, cabinetAPI){
  $scope.visitor = visitante;
  $scope.cabinet = armario;
  $scope.cabinet.visitor_id = $scope.visitor.id;

  $scope.emprestar = function(){
    cabinetAPI.buscarCabinet($scope.cabinet.id).success(function(data){
      if(data.visitor_id){
        alert("O armário " + $scope.cabinet.id + " já foi emprestado!");
      }else{
        cabinetAPI.editarCabinet($scope.cabinet.id, $scope.cabinet).success(function(data){
          $uibModalInstance.close(true);
        }).error(function(){
          $uibModalInstance.close(false);
          alert("O visitante "+$scope.visitor.name+" já possui uma chave");
        })
      }
    })
  }

  $scope.cancelar = function(){
    $uibModalInstance.close(false);
  }
})

// Medida provisória para o guarda volumes - INICIO

.controller('entradaCtrl', function($scope, $uibModal){

    $scope.guardarVolume = function(){
        var modalInstance = $uibModal.open({
          templateUrl: 'views/modais/emprestarArmario.html',
          controller: 'modalGuardarVolumeCtrl',
          size: 'lg'
        });
    }

})

.controller('modalGuardarVolumeCtrl', function($scope, $uibModal, $uibModalInstance, visitorAPI, cabinetAPI, $http){

  fluxo = {};
  fluxo.num_visitantes = 0;

  $scope.visitantes = {};
  $scope.mostrarTabela = false;

  $scope.consulta = {
    order: 'name',
    limit: 5,
    page: 1
  };


  $scope.cadastrarVisitante = function(){
    var modalInstance = $uibModal.open({
      templateUrl: 'views/modais/cadastrarVisitante.html',
      controller: 'cadastrarVisitanteCtrl'//Este controlador está no arquivo visitorController.js
    });

     modalInstance.result.then(function (visitante) {
      if(visitante){
        visitante.status = 1;
        visitorAPI.saveVisitor(visitante).success(function(data){
          
        })
      }
    });
  }

   $scope.onChange = function (page, limit) {
      $scope.consulta.page = page;
      $scope.consulta.limit = limit;
      return $scope.pesquisaVisitante();
    };

  $scope.pesquisaVisitante = function(){
    url = '?page='+$scope.consulta.page;
    url += '&ativos=0';
    url += '&limit='+$scope.consulta.limit;
    url += '&order='+$scope.consulta.order;
    url += '&filtro='+$scope.pesquisa+'%';
    $scope.botaoApertado = true;
    visitorAPI.paginaVisitor(url).success(function(data){
      console.log(data);
      $scope.total = data.total;
      $scope.visitantes = data.data;
      if(data.total == 0)
        $scope.mostrarTabela = false;
      else
        $scope.mostrarTabela = true;
    })

  }

  $scope.clickVisitante = function(visitante){
    abrirSegundoModal = false;
    if(visitante.status == 2){
      var modalInstance = $uibModal.open({
        templateUrl: 'views/modais/cadastrarVisitante.html',
        controller: 'editarVisitanteCtrl',//Este controlador está no arquivo visitorController.js
        resolve: {
          visitante: function(){
            return visitante;
          }
        }
      });

      modalInstance.result.then(function (visitante) {
        if(visitante){
          visitante.status = 1;
          visitorAPI.editarVisitor(visitante).success(function(data){
            console.log(data);
            abrirSegundoModal = true;
          })
        }
      });

    }
      if(abrirSegundoModal || visitante.status != 2){
        var modalInstance = $uibModal.open({
          templateUrl: 'views/modais/confirmarEntrada.html',
          controller: 'confirmarEntradaCtrl',
          resolve: {
              visitante: function(){
                return visitante;
            } 
          }
        });

        modalInstance.result.then(function(fluxo){
          if(fluxo){
            $http.post('api/v1.0/Fluxo', fluxo).success(function(data){
              console.log(data);
            });
          }
            $uibModalInstance.close(false);
        });
      }
    
  }

  $scope.cancelar = function () {
    $uibModalInstance.close(false);
  };

})


.controller('confirmarEntradaCtrl', function($scope, $uibModalInstance, visitante, cabinetAPI, $http){
  $scope.visitor = visitante;

  fluxo = {};
  fluxo.visitor_id = visitante.id;

  var data = new Date();


  $scope.imprimir = function(){
      var janela = window.open('about:blank');
      janela.document.write("************************<BR>*&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp*<BR>* Biblioteca Pública do Estado do Acre *<BR>*&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp*<BR>************************<BR>&nbsp&nbsp&nbsp&nbsp"+  data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()+" "+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds()+"<BR><BR>Nome:<BR>&nbsp&nbsp&nbsp&nbsp"+$scope.visitor.name+"<BR>Telefone:<BR>&nbsp&nbsp&nbsp&nbsp"+$scope.visitor.phone+"************************");
      janela.window.print();
      janela.window.print();
      janela.window.close();
      $uibModalInstance.close(fluxo);
  }

  $scope.registrarEntrada = function(){
    $uibModalInstance.close(fluxo);
  }

  $scope.cancelar = function(){
    $uibModalInstance.close(false);
  }
})

// Medida provisória para o guarda volumes - FIM 