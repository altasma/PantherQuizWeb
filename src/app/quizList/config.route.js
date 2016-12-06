(function() {
  'use strict';

  angular
    .module('app.quizList')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/quizlist', {
      templateUrl: 'app/quizList/quizList.html',
      controller: 'QuizListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });

    $routeProvider.when('/quizedit', {
      templateUrl: 'app/quizList/quizEdit.html',
      controller: 'QuizEditController',
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
