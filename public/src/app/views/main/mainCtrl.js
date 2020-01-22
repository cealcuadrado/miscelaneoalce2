(function(){
    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope'];

    function mainCtrl($scope){
        var vm = this;
        vm.title = 'Misceláneo al Cuadrado';
    }
})();