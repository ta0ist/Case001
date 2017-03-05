angular.module('login', []).controller('loginctrl', function($scope, $http) {
    $scope.user = {
        Name: '',
        Password: ''
    }
    $scope.error = '';
    $scope.checkuser = function() {
        if ($scope.user.Name == '' || $scope.user.Password == '') {
            $scope.error = '用户名密码不能为空！';
            $scope.$apply();
        } else {
            $http.post('checkuser', { user: $scope.user }).success(function(data) {
                if (data.Status == 0) {
                    window.location = '/';
                } else {
                    $scope.error = data.Data;
                }
            })
        }
    }
    $('body').on('keypress', function(data) {
        if (data.keyCode == 13) {
            $scope.checkuser();
        }
    })
})