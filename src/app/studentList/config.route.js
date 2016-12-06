(function() {
  'use strict';

  angular
    .module('app.studentList')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/studentlist', {
      templateUrl: 'app/studentList/studentList.html',
      controller: 'StudentListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
    $routeProvider.when('/newstudent', {
      templateUrl: 'app/studentList/directives/studentForm.html',
      controller: 'StudentFormController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });

    $routeProvider.when('/studentedit', {
      templateUrl: 'app/studentList/studentEdit.html',
      controller: 'StudentEditController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });


    $routeProvider.when('/studentquizzes', {
      templateUrl: 'app/studentList/studentQuizzes.html',
      controller: 'StudentQuizzesController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireSignIn();
  }

})();
