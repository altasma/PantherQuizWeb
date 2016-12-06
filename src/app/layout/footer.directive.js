(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('gzFooter', gzFooter);

  function gzFooter() {
    return {
      templateUrl: 'app/layout/footer.html',
      restrict: 'E',
      scope: {},
      controller: FooterController,
      controllerAs: 'vm'
    };
  }

  FooterController.$inject = ['$location', 'authService'];

  function FooterController($location, authService) {
    var vm = this;

    vm.isLoggedIn = authService.isLoggedIn;
    vm.logout = logout;

    function logout() {
      authService.logout();
      $location.path('/');
    }
  }

})();