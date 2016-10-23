(function(){
    'use strict';
    
    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);
    
    CategoriesController.$inject = ['MenuDataService'];
    
    function CategoriesController(MenuDataService){
        var ctrl = this;
        ctrl.items = [];
        var promise =  MenuDataService.getAllCategories();
        
        promise.then(function(result){
            ctrl.items = result;         
                     });
    }
    
})();