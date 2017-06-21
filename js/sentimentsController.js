angular.module('AylienApp')
    .controller('SentimentsController', SentimentsController);

//injecting http
SentimentsController.$inject = ['$http', '$scope'];
// main function
function SentimentsController($http, $scope) {
  var self = this;
   self.all=[];
   self.positives=[];
   self.neutral=[];
   self.negative=[];
   self.newSentiment={};
   self.addSentiment= addSentiment;
   self.deleteSentiment = deleteSentiment;

   $http.get("http://localhost:3000/sentiments")
   .then(function(response) {
     self.all = response.data.allSentiments;
   }, function(error) {
     console.log(error)
   });

   //post report method need to store _id from response
   function addSentiment(){
    $http
      .post('http://localhost:3000/sentiments', self.newSentiment, console.log(self.newSentiment))
      .then(function(response){
        self.all.push(response.data.sentiment);
        self.newSentiment = {};
          $http.get('http://localhost:3000/sentiments')
          .then(function(response){
            self.all = response.data.allSentiments;
          }, function(error){
            console.log(error)
            return;
          });

    }, function(error){

      console.log(error)
      return;
    });
   }

   function deleteSentiment(sentiment) {
      $http.delete("https://aylienapi.herokuapp.com/sentiments/"+sentiment._id)
        .then(function() {
          self.all.splice(self.all.indexOf(sentiment), 1);
        })
    }

};
