(function() {
  'use strict';

  angular
    .module('app.questionList')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/questionlist', {
      templateUrl: 'app/questionList/questionList.html',
      controller: 'QuestionListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });

    // $routeProvider.when('/questionform', {
    //   templateUrl: 'app/questionList/questionForm.html',
    //   controller: 'QuestionFormController',
    //   controllerAs: 'vm',
    //   resolve: {user: resolveUser}
    // });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireSignIn();
  }

})();
