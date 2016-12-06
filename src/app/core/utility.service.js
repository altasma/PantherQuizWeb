(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('utilityService', utilityService);

  utilityService.$inject = ['$firebaseArray', 'firebaseDataService', '$firebaseObject','$mdToast'];

  function utilityService($firebaseArray, firebaseDataService,$firebaseObject,$mdToast) {
   
    

    var service = {
      toEmailFormat : toEmailFormat,
      emailToPlainText : emailToPlainText,
      showSimpleToast : showSimpleToast,
     
    };

    return service;

       var last = {
      // bottom: true,
      // top: true,
      // left: true,
      // right: true
    };


    function showSimpleToast(message){
    var pinTo = last;

    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('left' )
        .hideDelay(2000)
    );
  }

    function toEmailFormat(plainText){
      //format to valid email address


        return plainText;
    }

    function emailToPlainText(email){
      //convert email to plaintext for firebase database.

      return email;
    }

  }

})();
