angular.module('AylienApp')
    .controller('SentimentsController', SentimentsController);

//injecting http
SentimentsController.$inject = ['$http', '$scope'];
// main function
function SentimentsController($http, $scope) {
  var self = this;
   self.all=[];
   self.positives=[];
   self.neutrals=[];
   self.negatives=[];
   self.newSentiment={};
   self.addSentiment= addSentiment;
   self.deleteSentiment = deleteSentiment;
   $scope.labels = ["Positive", "Neutral", "Negative"];


   $http.get("https://aylienapi.herokuapp.com/sentiments")
   .then(function(response) {
     self.all = response.data.allSentiments;
     for(i=0; i<response.data.allSentiments.length; i++){
       self.positives.push(response.data.allSentiments[i].positive_score);
       self.neutrals.push(response.data.allSentiments[i].neutral_score);
       self.negatives.push(response.data.allSentiments[i].negative_score);
     }
   }, function(error) {
     console.log(error)
   });

   //post report method need to store _id from response
   function addSentiment(){
    $http
      .post('https://aylienapi.herokuapp.com/sentiments', self.newSentiment, console.log(self.newSentiment))
      .then(function(response){
        self.all.push(response.data.sentiment);

        self.newSentiment = {};
          $http.get('https://aylienapi.herokuapp.com/sentiments')
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
