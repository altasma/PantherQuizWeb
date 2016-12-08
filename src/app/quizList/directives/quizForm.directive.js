(function() {
  'use strict';

  angular
    .module('app.quizList')
    .directive('gzQuizForm', gzQuizForm);

  function gzQuizForm() {
    return {
      templateUrl: 'app/quizList/directives/quizForm.html',
      restrict: 'E',
      controller: QuizFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        quizzes: '='

      }
    };
  }
     

  QuizFormController.$inject = ['quizService','firebaseDataService','classRoomService', '$rootScope'];


  function QuizFormController(quizService,firebaseDataService,classRoomService,$rootScope) {
    var vm = this;
    vm.noChromeMessage = "";

    vm.newQuiz= new quizService.Quiz();
    vm.addQuiz = addQuiz;
    var user = $rootScope.currentUser;

    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
        vm.noChromeMessage = "Use Google Chrome browser to create a new quiz.";
    }

    function addQuiz() {
          var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

      if (!isChrome) {
        classRoomService.showSimpleToast("Use Google Chrome to create a new quiz!");
        return;
    }
     
      var tempStart = vm.newQuiz.startTime.toLocaleString();
      var tempEnd = vm.newQuiz.endTime.toLocaleString();

      vm.newQuiz.isAvailable = "false";
      vm.newQuiz.isTaken = "false";
      vm.newQuiz.isExpired="false";

      vm.newQuiz.startTime = tempStart;
      vm.newQuiz.endTime = tempEnd;

       var  classRoomId = classRoomService.getCurrentClass().$id;
       var dbRef = firebase.database().ref();
      
       var quizzesRef = dbRef.child('users').child(user).child('classRooms').
                        child(classRoomId).child('quizzes');

       var quizKeyTeacher = quizzesRef.push().key;


      quizzesRef.child(quizKeyTeacher).set(vm.newQuiz);

       var quizPublicRef= dbRef.child('/quizzes/').child(classRoomId);
       
       quizPublicRef.child(quizKeyTeacher).set(vm.newQuiz);

      vm.newQuiz = new quizService.Quiz();
    }
  }

})();