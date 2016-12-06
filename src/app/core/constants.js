(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('PROTECTED_PATHS', ['/studentlist', '/classlist','/quizlist', '/questionlist']);

})();
