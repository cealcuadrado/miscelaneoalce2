(function(){
    var app = angular.module('app', [
        'ngAnimate',
        'ui.router'
    ]);

    app.config(function($stateProvider, $urlRouterProvider){
            var states = [{
                name: 'main',
                url:'/main',
                templateUrl: 'views/main/main.html',
                controller: 'mainCtrl as vm'
            }];

            states.forEach(function(state){
                $stateProvider.state(state);
            });

            $urlRouterProvider.otherwise('/main');
    });
})();