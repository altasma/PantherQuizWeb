(function() {
  'use strict';

  angular
    .module('app.classList')
    .controller('ClassListController', ClassListController);

  ClassListController.$inject = ['$rootScope', '$scope','classRoomService', 'user', '$route','$window'];
  function ClassListController($rootScope, $scope, classRoomService, user, $route, $window) {
  console.log("Starting ClassListController controller...!!");
    var vm = this;


       $rootScope.currentCl = classRoomService.getCurrentClass(null);
       $rootScope.userEmail = user.email;


        vm.rooms  = classRoomService.getClassRoomsByUser(user.uid);
        vm.classRoom = classRoomService.getCurrentClass();
  }

})();