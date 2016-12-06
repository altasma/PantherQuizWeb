(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('questionService', questionService);

  questionService.$inject = ['$firebaseArray', 'firebaseDataService','$firebaseObject'];

  function questionService($firebaseArray, firebaseDataService,$firebaseObject) {

    this.questions = null;
    this.question = null;
    this.choices = null;
    this.choicesObj = null;
    var service = {
      Question: Question,
      getQuestionsByQuiz: getQuestionsByQuiz,
      getQuestionByQuestionId: getQuestionByQuestionId,
      getChoicesByQuestionId : getChoicesByQuestionId,
      getChoicesFirebaseObjById : getChoicesFirebaseObjById,
      getQuestionsByQuizPublic : getQuestionsByQuizPublic,
      getChoicesByQuestionIdNew : getChoicesByQuestionIdNew,
      reset: reset
    };

    return service;

    ////////////

    function Question() {
      this.questionId='';
      this.answer = '';
      this.question= '';
      this.choices= {};
    }

    function getQuestionsByQuiz(uid,classId,quizId) {
       this.questions= $firebaseArray(firebaseDataService.root.child('quizzes').
                       child(classId).child(quizId).child('questions'));
        
       return this.questions;
    } 


   function getQuestionsByQuizPublic(classId,quizId) {
        this.questions= $firebaseArray(firebaseDataService.root.child('quizzes').
                        child(classId).child(quizId).child('questions'));
        return this.questions;
    } 


    function getQuestionByQuestionId(uid,classId,quizId,questionId){

      this.question = $firebaseObject(firebaseDataService.users.child(uid).
                      child('classRooms').child(classId).child('quizzes').child(quizId)
                      .child('questions').child(questionId));
      return this.question;
    }

    function getChoicesByQuestionIdNew(uid,classId,quizId,questionId){

      this.choices = $firebaseArray(firebaseDataService.users.child(uid).
                      child('classRooms').child(classId).child('quizzes').
                      child(quizId).child('questions').child(questionId).child('choices'));
      return this.choices;

    }


    function getChoicesByQuestionId(uid,classId,quizId,questionId){
      
      this.choices = $firebaseArray(firebaseDataService.root.child('quizzes').
                     child(quizId).child('questions').child(questionId).child('choices'));
      return this.choices;

    }

    function getChoicesFirebaseObjById(uid,classId,quizId,questionId){

        this.choicesObj = $firebaseArray(firebaseDataService.users.child(uid).
                          child('classRooms').child(classId).child('quizzes').
                          child(quizId).child('questions').child(questionId).child('choices'));

        return this.choicesObj;
    }

    function reset() {
      if (questions) {
        questions.$destroy();
        questions = null;
      }
    }

  }

})();
