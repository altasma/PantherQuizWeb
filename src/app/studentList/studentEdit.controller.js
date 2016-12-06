(function() {
  'use strict';

  angular
    .module('app.studentList')
    .controller('StudentEditController', StudentEditController);

  StudentEditController.$inject = ['studentListService', 'user'];
  function StudentEditController(studentListService, user) {
    var vm = this;

  }

})();