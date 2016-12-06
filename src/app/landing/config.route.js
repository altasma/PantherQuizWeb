(function() {
  'use strict';

  angular
    .module('app.landing')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/landing/landing.html'
    });

    $routeProvider.when('/faq', {
      templateUrl: 'app/landing/faq.html'
    });

     $routeProvider.when('/about', {
      templateUrl: 'app/landing/about.html'
    });
      $routeProvider.when('/contact', {
      templateUrl: 'app/landing/contact.html'
    });
  }

})();