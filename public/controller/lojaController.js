'use strict';

app.controller('LojaController', function($scope, toastr) {
		var socket = io();
		var vm = this;
		vm.pedidos = [];
		vm.selectedPedido = {id:''};


		vm.enviar = enviar;

		init();

		function init(){
			socket.on('loja pedidos', function(pedidos){
				vm.pedidos = pedidos;
				$scope.$apply();
			});
			socket.on('loja pedido', function(pedido){
				var encontrou = false;
				for(var x = 0; x < vm.pedidos.length && !encontrou; x++){
					if(vm.pedidos[x].id === pedido.id){
						vm.pedidos[x].status = pedido.status;
						encontrou = true;
					}
				}
				if(!encontrou){
					vm.pedidos.push(pedido);
				}
				$scope.$apply();
			});

		}

		function enviar() {
			var item = $("#selectFood :selected").attr('label');
			var obj={selectedPedido:vm.selectedPedido, usuario:vm.pedido.usuario, item:item};
			switch(vm.selectedPedido.id) {
				case "1":
					toastr.info('Seu pedido pode demorar de 20-30 minutos para o preparo');
					break;
				case "2":
					toastr.info('Seu pedido pode demorar de 10-20 minutos para o preparo');
					break;
				case "3":
					toastr.info('Seu pedido pode demorar de 5-10 minutos para o preparo');
					break;
				case "4":
					toastr.info('Seu pedido pode demorar de 40 minutos a 1 hora para o preparo');
					break;
				case "5":
					toastr.info('Já estamos trazendo seu sorvete aguarde alguns segundos');
					break;

			}
		    socket.emit('loja enviar', obj);
		    //vm.selectedPedido = '';
		}
	vm.update = function(){
		console.log('test');
	}

	});
