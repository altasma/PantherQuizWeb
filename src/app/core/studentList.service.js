(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('studentListService', studentListService);

  studentListService.$inject = ['$firebaseArray', 'firebaseDataService', '$firebaseObject'];

  function studentListService($firebaseArray, firebaseDataService, $firebaseObject) {

    var students = null;
    var currentStudent = null;
    var studentsObject = null;
    var currentClass = null;
    var studQuizzes = null;
    
    var service = {
      getCurrentStudent : getCurrentStudent,
      setCurrentStudent : setCurrentStudent,
      Student: Student,
      getStudentsListByClass: getStudentsListByClass,
      getStudentsListByClassObj:getStudentsListByClassObj,
      getStudQuizzesByClass :getStudQuizzesByClass,

    };

    return service;

    

    function Student() {
      this.email='';
     
    }

    function getStudentsListByClass(uid,classId) {
      //  if(!students){
        students= $firebaseArray(firebaseDataService.users.child(uid).child('classRooms').
                  child(classId).child('studentsList').orderByChild("key"));
    //}
      
      return students;
    }

    function getStudentsListByClassObj(uid,classId) {
      if (!studentsObject) {
        studentsObject= $firebaseArray(firebaseDataService.users.child(uid).child('classRooms').child(classId).child('studentsList'));
      }
      return studentsObject;
    }


   //returns list of student's quiz in a class
    function getStudQuizzesByClass(studEmail, classId){
     // if(!studQuizzes){
        studQuizzes= $firebaseArray(firebaseDataService.root.child("studentsQuiz").child(classId).child(studEmail));
     // }

      return studQuizzes;
    }


   function setCurrentStudent(student) {
      currentStudent  = student;
    }
    function getCurrentStudent(){
      if(!currentStudent){
        return new Student();
      }
      return  currentStudent;
    }

  }

})();
