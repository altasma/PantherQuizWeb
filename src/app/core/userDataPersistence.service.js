(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('userDataPersistenceService', userDataPersistenceService);

   userDataPersistenceService.$inject = ['$cookies', 'firebaseDataService', '$firebaseObject'];


  function userDataPersistenceService($cookies,firebaseDataService,$firebaseObject) {
    var root = firebase.database().ref(); //the root node reference of the database
    var userName = "";

    var service = {
       root: root,
       getCookieUserName: getCookieUserName, // userName cookie value
       setCookieUserName: setCookieUserName,

    };

    return service;
  

  function getCookieUserName(username) {
    console.log("cookieUserName:get", username,"-", userName);
      if (!userName) {
        userName= $cookies.get(username);

      }
      console.log("returnUserName:", userName);
      return userName;
    }

    function setCookieUserName(username){
      console.log("setUserName:", username);
        userName = username;
        $cookies.put("userName", username);
    }

    function clearCookieUserName(){
      userName = "";
      $cookies.remove("userName");
    }
  }

})();
