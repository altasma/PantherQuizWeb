(function() {
  'use strict';

  angular
    .module('app.questionList')
    .directive('gzQuestionForm', gzQuestionForm);

  function gzQuestionForm() {
    return {
      templateUrl: 'app/questionList/directives/questionForm.html',
      restrict: 'E',
      controller: QuestionFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        questions: '=',
        quiz : '=?bind',
        currentQuiz : '=',
        choices : '='


      }
    };
  }
     

  QuestionFormController.$inject = ['$scope','quizService', '$location','questionService','classRoomService','$firebaseArray','$firebaseObject','firebaseDataService','$rootScope'];

  function QuestionFormController($scope, quizService, $location, questionService, classRoomService,$firebaseArray,$firebaseObject, firebaseDataService,$rootScope) {
    var vm = this;
    var uid = $rootScope.uid;
    var classId = classRoomService.getCurrentClass().$id;
    vm.quizId =  $rootScope.currentQuizId;
    console.log("Start  QuestionFormController");
    console.log(vm.questions);
    console.log(vm.currentQuiz);
    vm.quizName = quizService.getCurrentQuiz().quizId;
    console.log(vm.quizName);
  
    vm.newQuestion= new questionService.Question();
    // console.log(vm.questions[0].choices);
    vm.addQuestion = addQuestion;
    vm.addNewChoice = addNewChoice;
    vm.removeChoice = removeChoice;
    vm.addNewQuestion= addNewQuestion;
    vm.deleteQuestion = deleteQuestion;
    vm.saveOneQuestion = saveOneQuestion;
    vm.saveAllQuestions = saveAllQuestions;
    
    function addNewChoice(question) { 
         vm.question = question;

      console.log(question);
      if(vm.question.choices != null){
        var i = 0;
        var key;
        for(key in vm.question.choices){
          console.log(i);
          console.log(key);
                    i++;
        }
      }
      else{
        var i = 0;
      
      vm.question.choices = [{'A':""}, {'B':""}];
    }

      console.log("Start addNewChoices...");
      console.log(vm.question.choices);
      var index = 0;
      var key;
      for (key in vm.question.choices) {
        index++;
        console.log(index);
        console.log(key);
        console.log(vm.question.choices[key]);
      }
     
      if(index >= 6){
   classRoomService.showSimpleToast("A maximum of 6 choices is allowed!");
       return;
      } 
      var newChoiceNo = index+1;
    // var newItemNo = vm.choices.length+1;
    switch(newChoiceNo){
      case 1:
          var newid = 'A';
          break;
      case 2:
          var newid = 'B';
          break;
      case 3:
          var newid = 'C';
          break;
      case 4: 
          var newid = 'D';
          break;
      case 5:
          var newid = 'E';
          break;
      case 6:
          var newid = 'F';
          break;
    }
    // vm.choices = vm.questions
    vm.question.choices[newid]=""; // added an empty choice 
    console.log(vm.question.choices[newid]);
    // vm.question.choices.push({'id': newid});
  }
  

    function removeChoice(question,choice) {
      console.log("Inside removeChoice func");
      console.log(question);
      console.log(choice);
     vm.choices = question.choices;  
     console.log("vm.choices;;;;", vm.choices);
     vm.choices[choice] = null;
     vm.choices = { 'A': 'true', 'B':'false'};
     console.log("vv", vm.choices);
    var count = 0;
    for(var a in vm.choices){
      count++;

    }
    console.log(count);
      if(count <= 2){
         classRoomService.showSimpleToast("Minimum choices are atleast 2!")
         return;
      }
    var lastItem = vm.choices.length-1;
    
    if(confirm("Deleting the selected choice permanently!")){
      console.log(vm.choices);
      vm.choices = questionService.getChoicesByQuestionId(uid,classId,vm.quizId,question.$id);
     console.log("vm.choices",vm.choices);
      vm.choices.$loaded().then(function() {
      var index = vm.choices.$getRecord(choice);
      console.log('index', index);
      index = choice-1;
       vm.choices
      .$remove(index)
      .then(function() {
        console.log('item removed');
        console.log(vm.choices);
      })
      .catch(function(error) {
        console.log('error', error);
      });
    });


       }
    }


  function saveOneQuestion(question,choices){
    console.log("Inside saveOneQuestion func");
    console.log(question);
    console.log(choices);
    // console.log(answer);
    console.log(vm.questions);
    // vm.questions[question.$id] = question;
    vm.questions.$save(question);
    vm.question = questionService.getQuestionByQuestionId(uid,classId,vm.quizId,question.$id);
    console.log(vm.question);
    vm.choices = questionService.getChoicesByQuestionId(uid,classId,vm.quizId,question.$id);
    console.log(vm.choices);
    console.log(question.choices);
    var imp = question.choices;
    console.log(imp);
    vm.choices.$save(imp);
    vm.question.choices = choices;
    vm.questions.$save(question);  //correct way to saved
    console.log(vm.question);
    console.log(vm.choices);
    
      classRoomService.showSimpleToast("Question is saved!");
   }

   function saveAllQuestions(){
    console.log(vm.questions);
    if(vm.questions.length == 0){
         classRoomService.showSimpleToast("There are no questions to be saved.");
         return;

    }
   classRoomService.showSimpleToast("This Quiz is succcessfully saved");
   console.log(vm.currentQuiz);
          $location.path('/quizlist');

  }


    function addNewQuestion(quiz) {
      console.log("Inside addNewQuestion func:"); 
      console.log(vm.questions);
      if(vm.questions != null){
             // vm.questions = [];
            console.log("Questions is  not empty:: ");

      vm.questions.$add({'$id':'','question':" ", 'choices':{'A':"True",'B':"False"},'answer':""})
      }
      else{
        console.log("Questions is empty: ");
        vm.questions ={};
        vm.questions.$add({'$id':'','question':" ", 'choices':{'A':"",'B':""},'answer':""});

      }

     }
    
    function deleteQuestion(question) {
      if(confirm("Delete this question permanently?")){
        vm.questions.$remove(question).then(function(success){
          classRoomService.showSimpleToast("Question has been deleted.");
        }, function(error){
          classRoomService.showSimpleToast("Error while this deleting question");

        });
        console.log("dele wu",question);
        console.log("Questions after deleted,", vm.questions);
      }
   
     }




    function addQuestion() {
      if(questions){

      }
      else{
        console.log("Questions is empty");
      }

      vm.newQuestion = new questionService.Question();
      vm.questions.$add(vm.newQuestion);
    }
  }

})();