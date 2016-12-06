(function() {
  'use strict';

  angular
    .module('app.studentList')
    .controller('StudentListController', StudentListController);

  StudentListController.$inject = ['studentListService', 'user', 'classRoomService', '$scope', '$rootScope','$mdToast']; // StudentListService === ClassRoomService
  function StudentListController(studentListService, user,classRoomService,$scope,$rootScope,$mdToast) {

    var vm = this;
    $rootScope.currentUser = user;

    vm.classRoom = classRoomService.getCurrentClass();
    vm.classId = vm.classRoom.$id;

    vm.students  = studentListService.getStudentsListByClass(user.uid,vm.classId);  //need uid,classID
  }

})();