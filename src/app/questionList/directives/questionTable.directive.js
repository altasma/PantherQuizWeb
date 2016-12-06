(function() {
  'use strict';

  angular
    .module('app.questionList')
    .directive('gzQuestionTable', gzQuestionTable);

  function gzQuestionTable() {
    return {
      templateUrl: 'app/questionList/directives/questionTable.html',
      restrict: 'E',
      controller: QuestionTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        questions: '=',
        quiz : '='
      }
    };
  }

  QuestionTableController.$inject = ['$location', 'quizService','classRoomService','$rootScope'];

  function QuestionTableController(classRoomService) {
    var vm = this;

    vm.removeQuestion= removeQuestion;
    vm.makeQuizLive = makeQuizLive;
    vm.toggleDone = toggleDone;

    function removeQuestion(question) {
      if(confirm("Delete  this question permanently?")){
             vm.questions.$remove(question);
 
      }
    }

 function save(question){
  vm.favorite ='true';
 }

   function makeQuizLive(){
    if(confirm("Make this quiz live for students?")){

    }
   }
   

    function toggleDone(question) {
      vm.questions.$save(question);
    }
  }

})();