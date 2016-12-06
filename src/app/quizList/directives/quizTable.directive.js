(function() {
  'use strict';

  angular
    .module('app.quizList')
    .directive('gzQuizTable', gzQuizTable);

  function gzQuizTable() {
    return {
      templateUrl: 'app/quizList/directives/quizTable.html',
      restrict: 'E',
      controller: QuizTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        quizzes: '='
      }
    };
  }

    QuizTableController.$inject = ['$location', 'quizService','classRoomService','$rootScope'];


  function QuizTableController($location, quizService, classRoomService,$rootScope) {
     var vm = this;
     $rootScope.quizs = vm.quizzes;

     vm.isAvailableForStudents = isAvailableForStudents;
     vm.currentClass = classRoomService.getCurrentClass();
     vm.removeQuiz = removeQuiz;
     vm.toggleDone = toggleDone;
     vm.makeQuizLive = makeQuizLive;
     vm.listQuestions = listQuestions;
     vm.editQuiz = editQuiz;

  

    function removeQuiz(quiz) {
      if(confirm("Are you sure you want remove permanently?")){
              var dbRef = firebase.database().ref();
              var quizRef = dbRef.child('quizzes').child(vm.currentClass.$id);

              var qKey = vm.quizzes.$$getKey(quiz);
              var dbRef = firebase.database().ref();
              var quizRef = dbRef.child('quizzes').child(vm.currentClass.$id).child(qKey).set(null);

             console.log("remove", vm.quizzes.$remove(quiz));
      }
    }

   
   //Dummy save method
   //Firebase automatically save the changed data
   //since the quiz object is FirebaseDatabase object
   //Can be modified so the user can decide to save it after finishes 
   //modifying
   function save(quiz){
       vm.favorite ='true';
     }

   function makeQuizLive(quiz){

     vm.quiz = quiz;
     var qKey = vm.quizzes.$$getKey(quiz);
     var dbRef = firebase.database().ref();
     var quizRef = dbRef.child('quizzes').child(vm.currentClass.$id).child(qKey).child("isAvailable");

    if(angular.equals(vm.quiz.isAvailable ,"true")){
      if(confirm("Are you sure you want to make quiz " +vm.quiz.quizId +  " available for students?")){
           vm.quiz.isAvailable = "false";
           quizRef.set("flase");
        }
     
      }

    else{
        if(confirm("Are you sure you want to hide quiz " +  vm.quiz.quizId  + " from students?"))
          vm.quiz.isAvailable = "true";
          quizRef.set("true");

      }
    
    vm.quizzes.$save(vm.quiz);
    
   }


    function listQuestions(quiz){
    
      $rootScope.currentQuizId = quiz.$id;
      $location.path('/questionlist');
    }

    function isAvailableForStudents(quiz){
      quizService.setCurrentQuiz(quiz);

      vm.quiz = quiz;
      if(angular.equals(vm.quiz.isAvailable, "true")){
        return true;
      }
      else if(angular.equals(vm.quiz.isAvailable, "false")){
        return false;
      }

      else{
        return "error";
      }
    }


    function editQuiz(quiz){
      vm.quiz = quiz;
      quizService.setCurrentQuiz(quiz);
    
      $rootScope.currentQuiz = quiz;

      $location.path('/quizedit');
   }


    function toggleDone(quiz) {
      vm.quizzes.$save(quiz);
    }
  }

})();