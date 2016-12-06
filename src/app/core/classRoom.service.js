(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('classRoomService', classRoomService);

  classRoomService.$inject = ['$firebaseArray', 'firebaseDataService', '$firebaseObject','$mdToast'];

  function classRoomService($firebaseArray, firebaseDataService,$firebaseObject,$mdToast) {

    var classRooms = null;
    var currentClass = null;
    var classQuizzes = null;
    var studQuizzes = null;

    var service = {
      getCurrentClass : getCurrentClass,
      setCurrentClass : setCurrentClass,
      ClassRoom: ClassRoom,
      getClassRoomsByUser: getClassRoomsByUser,
      showSimpleToast: showSimpleToast,
      getQuizReportByClass:getQuizReportByClass,
      getQuizReportByEmail: getQuizReportByEmail,
      getQuizzes:getQuizzes,

      // reset: reset
    };

    return service;

       //Toast message
       var last = {
      // bottom: true,
      // top: true,
      // left: true,
      // right: true
    };

    ////////////

    function showSimpleToast(message){
    var pinTo = last;

    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('left' )
        .hideDelay(2000)
    );
  }

    function ClassRoom() {
      this.school='';
      this.department='';
      this.name = '';
      this.id= '';
      this.year= '';
      this.term = '';  //such as fall,winter, summer..
    }

    function getClassRoomsByUser(uid) {
      if (!classRooms) {
        classRooms= $firebaseArray(firebaseDataService.users.child(uid).child('classRooms').orderByChild("name"));

        console.log('inside getClassRoomsByUser classRooms is..');
        // console.log(classRooms[0]);
      }
      return classRooms;
    }

    function getQuizReportByClass(classId) {
      //if (!classQuizzes) {
        classQuizzes= $firebaseArray(firebaseDataService.root.child("studentsQuiz").child(classId));

        console.log('inside getQuizReportByClass classQuizzes is..');
        // console.log(classRooms[0]);
     // }
      return classQuizzes;
    }

    function getQuizReportByEmail(email, classId) {
      if (!studQuizzes) {
        studQuizzes= $firebaseArray(firebaseDataService.root.child("studentsQuiz").child(classId).child(email));

        console.log('inside getQuizReportByClass classQuizzes is..', studQuizzes);
        // console.log(classRooms[0]);
     }
      return studQuizzes;
    }

    function getQuizzes(classRoom){
     var classRef = firebaseDataService.root.child("studentsQuiz").child(classRoom.$id);

    return $firebaseArray(classRef);

    }


   function setCurrentClass(classRoom) {
      currentClass  = classRoom;
    }
    function getCurrentClass(){
      if(!currentClass){
        return new ClassRoom();
      }
      return  currentClass;
    }
  
  }

})();
