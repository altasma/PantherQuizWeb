(function() {
  'use strict';

  angular
    .module('app.studentList')
    .controller('StudentFormController', StudentFormController);

  StudentFormController.$inject = ['studentListService', 'user'];

  function StudentFormController(studentListService, user) {
    var vm = this;
    vm.user = user;
    vm.students  = studentListService.getStudentsListByClass(user.uid); // need uid,classId
  }

})();