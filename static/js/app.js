'use strict';

var obiapp = angular.module('obiapp', [
    'ngRoute'
 ]);

obiapp.config(['$httpProvider','$routeProvider','$locationProvider',
     function($httpProvider,$routeProvider,$locationProvider) {
         $httpProvider.defaults.useXDomain = true;
         delete $httpProvider.defaults.headers.common['X-Requested-With'];

         $routeProvider.
             when('/', {
                 templateUrl: '/static/pages/welcome.html',
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

        var totalElements;
        $scope.visible = false;
        $scope.reload = function(){window.location.reload()};

        $scope.searchperson = function(){

            var req = {
                method: 'GET',
                url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/people/search?lastName='+$scope.search_text
            };
            $http(req).
                then(function(response){
                    console.log(response);
                    //$scope.reload();
                    $scope.people = response.data;
            }).error(function(status){
                  $scope.error = "0 results found";
            });
        }

        $scope.searchobit = function(){

            if($scope.search_personId==undefined)
                $scope.search_personId='';
            if($scope.search_newspaperId==undefined)
                            $scope.search_newspaperId='';
            var req = {
                method: 'GET',
                url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/obits/search?personId='+$scope.search_personId+'&&newspaperId='+$scope.search_newspaperId
            };
            $http(req).
                then(function(response){
                    console.log(response);
                    //$scope.reload();
                    if(response.data.content.length!=0)
                        $scope.obits = response.data.content;
                    else
                        $scope.error = "0 results found";
            });
        }

        $scope.addnewspaper = function(){
            var data = {};
            data["name"] = $scope.name;
            console.log(data);
            $http({
                  method: 'POST',
                  url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/newspapers/',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  data: data,
              }).then(function(response){
                    console.log(response);
                    $scope.visible = false;
                    $scope.reload();
              });
        }

        $scope.addperson = function(){
            var data = {};
            data["firstName"] = $scope.firstName;
            data["lastName"] = $scope.lastName;
            data["gender"] = $scope.gender=="Male"?"m":$scope.gender=="Female"?"f":"o";
            data["birthDate"] = $scope.birthDate;
            data["deathDate"] = $scope.deathDate;
            console.log(data);
            $http({
                  method: 'POST',
                  url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/people/',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  data: data,
              }).then(function(response){
                    console.log(response);
                    $scope.visible = false;
                    $scope.reload();
              });
        }

        $scope.addobit = function(){
            var data = {};
            data["personId"] = $scope.personId;
            data["newspaperId"] = $scope.newspaperId;
            data["issueDate"] = $scope.issueDate;
            data["pageNumber"] = $scope.pageNumber;
            console.log(data);
            $http({
                  method: 'POST',
                  url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/obits/',
                  data: data,
              }).then(function(response){
                    console.log(response);
                    $scope.visible = false;
                    $scope.reload();
              });
        }

        $scope.getnewspapers = function(){
            var req = {
                method: 'GET',
                url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/newspapers'
            };
            $http(req).
                then(function(response){
                    console.log(response);
                    //$scope.newspapers = response.data.content;
                    totalElements = response.data.totalElements;
                    //totalPages = response.data.totalPages;
                    //for(int i=1;i<totalPages;i++){
                    var req2 = {
                            method: 'GET',
                            url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/newspapers?size='+totalElements
                    };
                    $http(req2).
                        then(function(response){
                            //console.log(response);
                            $scope.newspapers = response.data.content;
                    });
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
                    //$scope.people = response.data.content;
                    totalElements = response.data.totalElements;
                    //totalPages = response.data.totalPages;
                    //for(int i=1;i<totalPages;i++){
                    var req2 = {
                            method: 'GET',
                            url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/people?size='+totalElements
                    };
                    $http(req2).
                        then(function(response){
                            //console.log(response);
                            $scope.people = response.data.content;
                    });
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
                    //$scope.obits = response.data.content;
                    totalElements = response.data.totalElements;
                    //totalPages = response.data.totalPages;
                    //for(int i=1;i<totalPages;i++){
                    var req2 = {
                            method: 'GET',
                            url: 'http://sample-env.qu9wzzvmes.us-east-1.elasticbeanstalk.com/obits?size='+totalElements
                    };
                    $http(req2).
                        then(function(response){
                            //console.log(response);
                            $scope.obits = response.data.content;
                    });
                });
        }

}]);