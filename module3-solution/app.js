(function(){
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);
    
    function FoundItems(){
        var ddo = {
            templateUrl: 'found_items.html',
            scope: {
                found : '<',
                onRemove: '&',
                message: '<'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        
        return ddo;
    }
    
    function FoundItemsDirectiveController(){
        var list = this;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(service){
        var ctrl = this;
        
        ctrl.search = '';
        ctrl.noFoundMessage = false;
        ctrl.found = [];
        
        ctrl.narrowItDown = function(){
            console.log('Narrow It Down for Me!');
            if(ctrl.search == ''){
                ctrl.noFoundMessage = true;
                ctrl.found = [];
                return;
            }
            var promise = service.getMatchedMenuItems(ctrl.search);
            promise.then(function(result){
                console.log("Result: ", result);
                ctrl.found = result;
                if(ctrl.found.length == 0){
                    ctrl.noFoundMessage = true;
                }else{
                    ctrl.noFoundMessage = false;
                }
            });
        }
        ctrl.remove = function(index){
            console.log("Ejecutando remove", index, this);
          ctrl.found.splice(index, 1);
          if(ctrl.found.length == 0){
              ctrl.noFoundMessage = true;
          }
        };
        
        ctrl.noFound = function(){
            return ctrl.noFoundMessage;
        };
    }
    
    
    MenuSearchService.$inject = ['$http', '$filter'];
    function MenuSearchService($http, $filter){
        var service = this;
        
        var items = [];
        
        service.getMatchedMenuItems = function (searchTerm){
            console.log('getMatchedMenuItems:', searchTerm);
            
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
                .then(function(result){
                    console.log("filtering results ....");
                    return $filter('filter')(result.data.menu_items, {description:searchTerm});
            });
        };
    }
    
})();