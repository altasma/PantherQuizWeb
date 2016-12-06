(function() {
  'use strict';

  angular
    .module('app.quizList')
    .directive('gzQuizEdit', gzQuizEdit);

  function gzQuizEdit() {
    return {
      templateUrl: 'app/quizList/directives/quizEdit.html',
      restrict: 'E',
      controller: QuizEditController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        // quiz: '=?bind'

      }
    };
  }


      

  QuizEditController.$inject = ['quizService','$location','$rootScope', 'classRoomService' ,'firebaseDataService'];

  function QuizEditController(quizService, $location,$rootScope,classRoomService,firebaseDataService) {
    var vm = this;
    var quizs = $rootScope.quizs;
    var currQuiz = $rootScope.currentQuiz;
    var classId = classRoomService.getCurrentClass().$id;

    vm.quiz = currQuiz;
    vm.updateQuiz= updateQuiz;

    function updateQuiz(quiz) {
       if(vm.quiz){
      var quizKey = quiz.$id;

      var quizInQuizzesRef = firebaseDataService.root.child("quizzes").child(classId).child(quiz.$id);

      quizInQuizzesRef.child("quizName").set(vm.quiz.quizName);
      quizInQuizzesRef.child("quizId").set(vm.quiz.quizId);
      quizInQuizzesRef.child("startTime").set(vm.quiz.startTime);
      quizInQuizzesRef.child("endTime").set(vm.quiz.endTime);
      quizInQuizzesRef.child("challenge").set(vm.quiz.challenge);
      quizInQuizzesRef.child("isExpired").set(vm.quiz.isExpired);
      quizInQuizzesRef.child("isTaken").set(vm.quiz.isTaken);
      quizInQuizzesRef.child("isAvailable").set(vm.quiz.isAvailable);

      quizs.$save(vm.quiz); //save vm.quiz in to quiz(quizzes under user(teacher) node).

    }

      classRoomService.showSimpleToast("Quiz Info Updated Successfully!");
      
       $location.path('/quizlist');

    }
  }

})();