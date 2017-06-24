angular.module('AylienApp', ["chart.js", "angular-loading-bar"])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"><h4><em>Gathering Sentiments</h4></div>';
  }]);
