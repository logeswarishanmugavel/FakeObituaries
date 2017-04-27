'use strict';

var obiapp = angular.module('obiapp', [
    'ngRoute'
 ]);

obiapp.config(['$routeProvider','$locationProvider',
     function($routeProvider,$locationProvider) {
         $routeProvider.
             when('/', {
                 templateUrl: '/static/pages/welcome.html',
                 controller: 'obiController'
             }).
             when('/newspapers_list', {
                 templateUrl: '/static/pages/newspapers_list.html',
                 controller: 'obiController'
             }).
            /*  when('/friends', {
                  templateUrl: '/static/pages/friends.html',
                  controller: 'obiController'
              }).*/
             otherwise({
                 redirectTo: '/'
             });

         $locationProvider.hashPrefix('');
    }]);

obiapp.controller('obiController',['$scope','$http',
    function ($scope,$http) {
        $scope.getnewspapers = function(){
            var req = {
                method: 'GET',
                url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/newspapers',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            $http(req).
                then(function(response){
                    console.log(response.data.content);
                    $scope.newspapers = response.data.content;
                });
        }

}]);