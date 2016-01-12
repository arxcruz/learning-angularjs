angular.module('yw.main', 
    [
        'my.core',
        'yw.divelog',
        'yw.user',
        'yw.charts'
    ])
    .config(function() {
        console.log('yw.main: config()');
    })
    .run(function() {
        console.log('yw.main: run()');
    });

angular.module('yw.divelog', []);

angular.module('yw.user', ['my.core']);

angular.module('my.core',
    [
        'my.core.comm',
        'my.core.ui'
    ]);

angular.module('yw.charts', ['my.core']);

angular.module('my.core.comm', []);

angular.module('my.core.ui', []);

angular.module('yw.main')
    .controller('moduleCtrl', 
        function($scope) {
            $scope.message = 'Module dependency checked';
        });

angular.module('dummy1', ['dummy2']);