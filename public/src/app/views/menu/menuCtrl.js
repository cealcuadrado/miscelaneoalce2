(function(){
    angular
        .module('app')
        .controller('menuCtrl', menuCtrl);

    menuCtrl.$inject = ['$scope'];

    function menuCtrl($scope) {
        var vm = this;
        vm.title = 'Menu';
    }
})();