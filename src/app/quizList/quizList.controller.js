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

    if(typeof(Storage) != "undefined"){
      if(vm.classId == undefined){
       
        vm.classId =  localStorage.getItem("classId");//retrieve clssId from localstorage if browser was refreshed
      }
      else{
        localStorage.setItem("classId", vm.classId);//Store class ID to local storage

      }
    }


     vm.quizzes  = quizService.getQuizzesByClassRoom(user.uid,vm.classId );

  }

})();