(function() {
  'use strict';

  angular
    .module('app.questionList')
    .controller('QuestionFormController', QuestionFormController);

  QuestionFormController.$inject = ['user','$location','questionService','classRoomService', 'quizService','$firebaseArray','$firebaseObject','firebaseDataService'];
  function QuestionFormController(user,$location, questionService, classRoomService, quizService,$firebaseArray,$firebaseObject, firebaseDataService) {
    var vm = this;
    
  }

})();