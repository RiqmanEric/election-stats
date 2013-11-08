'use strict';


// Declare app level module which depends on filters, and services
angular.module('esi', ['esi.filters', 'esi.services', 'esi.directives', 'esi.controllers']).
  config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {templateUrl: 'partials/home.html', controller: 'HomeCntl'})
    .when('/party/:partyname', {templateUrl: 'partials/party.html', controller: 'PartyCntl'})
    .when('/state/:statename', {templateUrl: 'partials/state.html', controller: 'StateCntl'})
    .when('/person/:personname/:dob', {templateUrl: 'partials/person.html', controller: 'PersonCntl'})
    .when('/constituency/:statename/:constituencyname', {templateUrl: 'partials/constituency.html', controller: 'ConstituencyCntl'})
    .when('/error', {templateUrl: 'partials/error.html'})
    .otherwise({redirectTo: '/'});

    // $locationProvider.html5Mode(true);
  })
  .run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
      $(document).foundation();
    });
  });
