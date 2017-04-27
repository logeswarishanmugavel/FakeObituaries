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
             when('/newspapers', {
                 templateUrl: '/static/pages/newspapers.html',
                 controller: 'obiController'
             }).
             when('/people', {
                 templateUrl: '/static/pages/people.html',
                 controller: 'obiController'
             }).
             when('/obits', {
                 templateUrl: '/static/pages/obits.html',
                 controller: 'obiController'
             }).
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
                    $scope.newspapers = response.data.content;
                });
        }
        $scope.getpeople = function(){
            var req = {
                method: 'GET',
                url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/people',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            $http(req).
                then(function(response){
                    console.log(response.data.content);
                    $scope.people = response.data.content;
                });
        }
        $scope.getobits = function(){
            var req = {
                method: 'GET',
                url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/obits',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            $http(req).
                then(function(response){
                    console.log(response.data.content);
                    $scope.obits = response.data.content;
                });
        }

}]);