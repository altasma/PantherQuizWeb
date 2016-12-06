(function() {
  'use strict';

  angular
    .module('app.classList')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/classlist', {
      templateUrl: 'app/classList/classList.html',
      controller: 'ClassListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
    $routeProvider.when('/newclass', {
      templateUrl: 'app/classList/directives/classForm.html',
      controller: 'ClassFormController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });

    $routeProvider.when('/classedit', {
      templateUrl: 'app/classList/classEdit.html',
      controller: 'ClassEditController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireSignIn();
  }

})();
