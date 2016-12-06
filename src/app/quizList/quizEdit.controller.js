(function() {
  'use strict';

  angular
    .module('app.quizList')
    .controller('QuizEditController', QuizEditController);

  QuizEditController.$inject = ['quizService', 'user'];
  function QuizEditController(quizService, user) {
    var vm = this;
  }

})();