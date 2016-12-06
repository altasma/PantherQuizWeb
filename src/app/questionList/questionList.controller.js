(function() {
  'use strict';

  angular
    .module('app.questionList')
    .controller('QuestionListController', QuestionListController);

  QuestionListController.$inject = ['questionService', 'user','classRoomService','$scope','$rootScope'];

  function QuestionListController(questionService, user, classRoomService,$scope,$rootScope) {
    var vm = this;
    $rootScope.uid = user.uid;
    
    vm.classId = classRoomService.getCurrentClass().$id;
    
    vm.quizId =  $rootScope.currentQuizId;

    vm.questions  = questionService.getQuestionsByQuiz(user.uid, vm.classId, vm.quizId);
    vm.question = {};
    vm.choices ="";
    vm.currentQuestion = "";

  }

})();