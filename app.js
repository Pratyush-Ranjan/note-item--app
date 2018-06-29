var app = angular.module('itemlist', ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "itemlist.html",
            controller: "firstcontroller"
        })
        .when("/addItem",{
            templateUrl: "addItem.html",
            controller: "Itemcontroller"
        })
        .when('/addItem/edititem/:id',{
            templateUrl: 'addItem.html',
            controller: 'Itemcontroller'
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.service("itemservice", function(){

    var itemservice = {};

    itemservice.Items = [
        {id: 1, buyed: false, itemName: 'milk', itemquantity:'1 litre' },
        {id: 2, buyed: false, itemName: 'oreo', itemquantity:'3 packets'},
        {id: 3, buyed: false, itemName: 'ice cream', itemquantity:'5 asli-aam' },
        {id: 4, buyed: false, itemName: 'potatoes', itemquantity:'3 kg' },
        {id: 5, buyed: true, itemName: 'tomatoes', itemquantity:'2 kg' },
        {id: 6, buyed: true, itemName: 'brown bread',itemquantity:'1 packet' },
        {id: 7, buyed: false, itemName: 'dahi', itemquantity:'2 packets' },
        {id: 8, buyed: false, itemName: 'Maggie', itemquantity:'12 family-pack' }
    ];

        
    itemservice.findid = function(id){
        for(var item in itemservice.Items){
            if(itemservice.Items[item].id === id) {
                return itemservice.Items[item];
            }
        }
    };

    itemservice.getId = function(){
        if(itemservice.nid){
            itemservice.nid++;
            return itemservice.nid;
        }else{
            var maxid = _.max(itemservice.Items, function(entry)
                { return entry.id;})
            itemservice.nid = maxid.id + 1;
            return itemservice.nid;
        }
    };

    itemservice.markCompleted = function(entry){
        var ditem = itemservice.findid(entry.id);
        ditem.buyed = !ditem.buyed; 
    };

    itemservice.remove = function(entry){
        var index = itemservice.Items.indexOf(entry);
        itemservice.Items.splice(index, 1);
    };

    itemservice.save = function(entry) {
        var updatedItem = itemservice.findid(entry.id);
        if(updatedItem){
            updatedItem.buyed = entry.buyed;
            updatedItem.itemName = entry.itemName;
            updatedItem.itemquantity = entry.itemquantity;
        }
        else
        {
            entry.id = itemservice.getId();
            itemservice.Items.push(entry);
        }
    };
    return itemservice;

});

app.controller("firstcontroller", ["$scope", "itemservice", function($scope, itemservice) {

    $scope.Items = itemservice.Items;

    $scope.remove = function(entry){
        itemservice.remove(entry);
    };

    $scope.markCompleted = function(entry){
        itemservice.markCompleted(entry);
    };

}]);

app.controller("Itemcontroller", ["$scope", "$routeParams", "$location", "itemservice", function($scope, $routeParams, $location, itemservice){

    if(!$routeParams.id) {
        $scope.Item = {id: 0, buyed: false, itemName: "", itemquantity: "" };
    }else{
        $scope.Item = itemservice.findid(parseInt($routeParams.id));
    }
    $scope.save = function(){
        itemservice.save( $scope.Item );
        $location.path("/");
    };

}]);
