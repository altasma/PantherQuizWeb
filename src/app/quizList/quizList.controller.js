(function() {
  'use strict';

  angular
    .module('app.quizList')
    .controller('QuizListController', QuizListController);

  QuizListController.$inject = ['quizService', 'user','classRoomService', '$scope', '$rootScope', '$route','$document'];

  function QuizListController(quizService, user, classRoomService, $scope, $rootScope, $route , $document) {
    var vm = this;
    $rootScope.currentQuizId = "";
    vm.clasRoom = classRoomService.getCurrentClass();
    vm.classId = vm.clasRoom.$id;
    $rootScope.currentUser = user.uid;


     vm.quizzes  = quizService.getQuizzesByClassRoom(user.uid,vm.classId );

  }

})();