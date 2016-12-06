(function() {
  'use strict';

  angular
    .module('app.studentList')
    .controller('StudentQuizzesController', StudentQuizzesController);

  StudentQuizzesController.$inject = ['studentListService', 'user'];
  function StudentQuizzesController(studentListService, user) {
    var vm = this;
  }

})();