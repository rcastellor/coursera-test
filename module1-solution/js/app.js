(function () {
'use strict';

angular.module('FirstApp', [])

.controller('LunchCheckController', LaunchCheckController);

LaunchCheckController.$inject = ['$scope'];
    
function LaunchCheckController (scope) {
  scope.items = '';
  scope.message = '';
  scope.clickButton = function () {
    scope.message = getMessageString(scope.items);
  };
    
    function getMessageString(items){
        if(items == ''){
            message = 'Please enter data first';
        }else{
            var itemArray = items.split(',');
            var message = '';

            var itemNumber = 0;

            for(var i = 0; i<itemArray.length; i++){
                if(itemArray[i].trim() != ''){
                    itemNumber++;
                }
            }

            if(itemNumber < 4){
                message = 'Enjoy!';
            }else{
                message = 'Too much!';
            }
        }
        return message;
    }
  };
})();