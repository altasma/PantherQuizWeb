(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('quizService', quizService);

  quizService.$inject = ['$firebaseArray', 'firebaseDataService','$firebaseObject'];

  function quizService($firebaseArray, firebaseDataService, $firebaseObject) {

     var quizzes = null;
     var currentQuiz = null;
     var quiz = null;
     var quizPublic =null;

    
     var service = {
      Quiz: Quiz,
      getQuizzesByClassRoom: getQuizzesByClassRoom,
      getCurrentQuiz: getCurrentQuiz,
      setCurrentQuiz : setCurrentQuiz,
      getQuizByQuizId: getQuizByQuizId,
      getQuizByClassRoomPublic: getQuizByClassRoomPublic,
    };

    return service;


    function Quiz() {

      this.quizName=''; // identifies the quiz by name
      this.isAvailable= '';  // isAvailable for students
      this.isTaken= '';  // is taken by students
      this.isExpired= '';  //if the time set by the iinstructor is expired
      this.startTime='';
      this.endTime='';
      this.questions={};
      this.challenge='';
    }

    
    function getQuizzesByClassRoom(uid, classId) {
        //if(!quizzes){
        quizzes= $firebaseArray(firebaseDataService.users.child(uid).child('classRooms')
                 .child(classId).child('quizzes'));
     // }  
      return quizzes;
    }

     function getQuizByClassRoomPublic(classId,quizId) {
        //if(!quizzes){
        quizPublic= $firebaseObject(firebaseDataService.root.child("quizzes").
                    child(classId).child(quizId)).$ref();
    
     // }   
      return quizzes;
    }

    function getQuizByQuizId(uid, classId,quizId) {

        quiz= $firebaseObject(firebaseDataService.users.child(uid).child('classRooms').
               child(classId).child('quizzes').child(quizId).child(quizId));
    
      return quiz;
    }

    function setCurrentQuiz(quiz){
      currentQuiz = quiz;
    }
    

    function getCurrentQuiz(){
      if(!currentQuiz){
        return new Quiz;
      }
     
      return currentQuiz;
    }

  }

})();
