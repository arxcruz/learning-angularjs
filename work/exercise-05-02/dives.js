angular.module('diveLog', [])
    .controller('diveLogCtrl', DiveLogCtrl)
    .factory('diveLogApi', diveLogApi)
    .constant('apiUrl', 'http://unraveling-ng.azurewebsites.net');

function DiveLogCtrl($scope, diveLogApi) {
    $scope.dives = [];
    $scope.isLoading = isloading;
    $scope.refreshDives = refreshDives;
    $scope.errorMessage = '';

    var loading = false;

    function isloading() {
        return loading;
    }

    function refreshDives() {
        loading = true;
        $scope.dives = [];
        $scope.errorMessage = '';

        diveLogApi.getDives()
            .success(function(data) {
                $scope.dives = data;
                loading = false;
            })
            .error(function () {
                $scope.errorMessage = "Request failed";
                loading = false;
            });
    }
}

function diveLogApi($http, apiUrl) {
    return {
        getDives: function() {
            var url = apiUrl + '/api/backendtest/dives';
            return $http.get(url);
        }
    }
}