(function() {
  'use strict';

  angular
    .module('app.studentList')
    .directive('gzStudentForm', gzStudentForm);

  function gzStudentForm() {
    return {
      templateUrl: 'app/studentList/directives/studentForm.html',
      restrict: 'E',
      controller: StudentFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        students: '='

      }
    };
  }
     

  StudentFormController.$inject = ['studentListService', '$firebaseArray','$firebaseObject','classRoomService', '$rootScope','$mdToast','firebaseDataService'];

  function StudentFormController(studentListService, $firebaseArray,$firebaseObject,classRoomService, $rootScope,$mdToast,firebaseDataService) {
    var vm = this;
    vm.classRoom =classRoomService.getCurrentClass();
    vm.classId = vm.classRoom.$id;
    vm.user = $rootScope.currentUser;
  
    vm.newStudent= new studentListService.Student();
    vm.addStudent = addStudent;
    vm.addStudentHelperCallBack = addStudentHelperCallBack;
    var formattedEmailList = [];  //global formattedEmailsList;
    var listOfExistedEmails ;

  function addStudentHelperCallBack(formattedEmailList){
       var existedEmailsCount = 0;
       var existedEmailsList = [];
       var isClassStudListEmpty = false;
      
       var newStudEmail ;
      for(var i = 0; i < formattedEmailList.length; i++){
           var studetsListRef = studentListService.getStudentsListByClassObj(vm.user.uid, vm.classId);
           var stuRef = firebaseDataService.users.child(vm.user.uid).child('classRooms').child(vm.classId).child('studentsList');
           var exists = false;

          stuRef.once('value', function(snapshot) {
            
            if(snapshot && snapshot.hasChildren()){
                isClassStudListEmpty = false;
            
          snapshot.forEach(function(childSnapshot) {
          var emailVal = childSnapshot.child('email').val().toLowerCase();
            newStudEmail = formattedEmailList[i].toLowerCase();

          if(emailVal == newStudEmail){
            exists = true;
            return ;
          }

      });
        }
        newStudEmail = formattedEmailList[i].toLowerCase();
     });

      if(exists){
        existedEmailsCount ++;  
        existedEmailsList.push(newStudEmail); //push the existing email to display for the user(unsuccessfull adds)

        }
       else{
         var studetsListRef = studentListService.getStudentsListByClassObj(vm.user.uid, vm.classId).$ref();
         var newStudentKey = studetsListRef.push().key;
         var tempNewStudent = new studentListService.Student();
         tempNewStudent.email = newStudEmail;

         vm.students.$add(tempNewStudent);
         var dbRef = firebase.database().ref();
         var emailInputSplit = tempNewStudent.email.split("@");

         emailInputSplit[1] =    emailInputSplit[1].replace(".","dot");
         var emailAfterSplit = emailInputSplit[0]+ "-"+emailInputSplit[1];

         dbRef.child('/studentsList').child(emailAfterSplit).child('classes').child(newStudentKey).
               set({classId:vm.classId, name:vm.classRoom.name, id:vm.classRoom.id});

         classRoomService.showSimpleToast("Student added successfully!");
         vm.newStudent = new studentListService.Student();
         tempNewStudent = new studentListService.Student();
    }//end of if(exists) else block

    } //end of for(var i = 0; i < formattedEmailList.length; i++) block

    return existedEmailsList;
  }// end of addStudentHelper function

   
    //preprocesses input before initiaing a database connection
    function addStudent(addStudentHelperCallBack) {
       var files = document.getElementById('files').files;   

    console.log("vm.newStudentEmail", vm.newStudent.email);
      if(!vm.newStudent.email){
         if(files.length == 0){
            classRoomService.showSimpleToast("Please enter an email or select a file.")
            return;
           }
            else{
               // Check for the various File API support.
               if (window.File && window.FileReader && window.FileList) {
                  //All the File APIs are supported.
                   var file = files[0];
                   var textType = /text.*/;
                   var reader = new FileReader();
                   reader.readAsText(file);

                   //return if file type is not text file
                   if (!file.type.match(textType)){
                    classRoomService.showSimpleToast("File type" + file.type + " not supported, only text file is supported");
                    return;
                    }
                  //process the text file
                  classRoomService.showSimpleToast("Validating your input file.....");
                   reader.onload = function() {
                    preprocess();

                    listOfExistedEmails = vm.addStudentHelperCallBack(formattedEmailList);

                     console.log("After preprocessing...", formattedEmailList.length);

          
          if(listOfExistedEmails.length > 0){
            classRoomService.showSimpleToast("" + listOfExistedEmails.length +" were duplicates," + listOfExistedEmails.toString() + "");
            listOfExistedEmails = 0;
            formattedEmailList =[];
            return;
          }
          else{
            return;
          }

           function preprocess(){
                  var emailsFromFile = reader.result.split(",");

                  for(var i = 0; i < emailsFromFile.length; i++){
                     if(emailsFromFile[i]){

                        var rawEmail= emailsFromFile[i].replace(/\s/g, "") ;
                        if(!rawEmail){
                            continue;
                           }

                          
                           formattedEmailList.push(rawEmail); //will be splitted inside addStudentHelper..
                       }
                       else{ //empty email
                         // console.log("a:", "Empty email");
                        }

                         }//End of for(var i = 0; i < emailsFrom.length;i++)
                       }//end of preprocess//

                        }//end on.load()

                      } 

                   else
                      {
                    classRoomService.showSimpleToast('The File APIs are not fully supported in this browser.');
                    return;
                   }
             }
          }// end of if(!vm.newStudent.email).. preprocessing the text file 
          
          else{
            formattedEmailList.push(vm.newStudent.email); // an the single email to the list
            vm.addStudentHelperCallBack(formattedEmailList);//call addStudentHelper to add this single email
            formattedEmailList = [];
            listOfExistedEmails = 0;
          }

  }
}

})();