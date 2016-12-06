(function() {
  'use strict';

  angular
    .module('app', [
      // Angular modules.
      'ngRoute',

      //DatePicker starp module

      // Third party modules.
      'firebase',
      'ngMaterial',

      // Custom modules.
      'app.auth',
      'app.core',
      'app.landing',
      'app.layout',
      'app.classList',
      'app.quizList',
      'app.questionList',
      'app.studentList',
      'ngSanitize',
      'ngCsv',
      'ngCookies'
    ])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }

  runFunction.$inject = ['$rootScope', '$location'];

  function runFunction($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path('/');
      }
    });
  }

})();
