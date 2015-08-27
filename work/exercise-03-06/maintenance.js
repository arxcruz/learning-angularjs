angular.module('maintenance', ['ngRoute'])
    .controller('adminCtrl', AdminCtrl)
    .controller('mainCtrl', MainCtrl)
    .controller('locationsCtrl', LocationsCtrl)
    .controller('divesCtrl', DivesCtrl)
    .factory('currentSpot', currentSpot)
    .directive('ywActiveMenu', ywActiveMenu)
    .directive('ywMenuId', ywMenuId)
    .config(function($routeProvider) {
        $routeProvider.when('/locations', {
            templateUrl: 'views/locations.html',
            controller: 'locationsCtrl'
        });
        $routeProvider.when('/dives', {
            templateUrl: 'views/sites.html',
            controller: 'divesCtrl'
        });
        $routeProvider.otherwise({
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
        });
    }); 

function currentSpot() {
    var activeMenuId = '';
    var titleText = '';

    return {
        setCurrentSpot: function(menuId, title) {
            activeMenuId = menuId;
            titleText = title;
        },
        getActiveMenu: function() {
            return activeMenuId;
        },
        getTitle: function() {
            return titleText;
        }
    }
}
//100003553
function ywActiveMenu(currentSpot) {
    return function(scope, element, attrs) {
        var activeMenuId = attrs["ywActiveMenu"];
        var activeTitle = attrs["ywActiveTitle"];
        currentSpot.setCurrentSpot(activeMenuId, activeTitle);
    }
}

function ywMenuId(currentSpot) {
    var menuElements = [];

    function setActive(element, menuId) {
        if(currentSpot.getActiveMenu() == menuId) {
            element.addClass('active');
        } else {
            element.removeClass('active');
        }
    }

    return function(scope, element, attrs) {
        var menuId = attrs["ywMenuId"];
        menuElements.push({id: menuId, node: element});

        var watcherFn = function(watchScope) {
            return watchScope.$eval('getActiveMenu()');
        }
        
        scope.$watch(watcherFn, function (newValue, oldValue) {
            for(var i = 0; i < menuElements.length; i++) {
                var menuElement = menuElements[i];
                setActive(menuElement.node, menuElement.id);
            }
        });
    }
}

function AdminCtrl($scope, currentSpot) {
    $scope.isActive = isActive;
    $scope.getTitle = getTitle;

    function isActive(menuId) {
        return currentSpot.getActiveMenu() == menuId;
    }

    function getTitle() {
        return currentSpot.getTitle();
    }
}

function MainCtrl(currentSpot) {

}

function LocationsCtrl(currentSpot) {

}

function DivesCtrl(currentSpot) {

}
