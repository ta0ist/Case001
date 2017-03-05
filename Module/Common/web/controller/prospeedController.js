angular.module('prospeed', []).controller('prospeedctrl', function($scope, $http) {
    $scope.speedrange = '';
    $scope.color = ["red", "green", "yellow"];

    $scope.speed = 50;
    $scope.truespeed = 31;
    $scope.color = {}

    var ans = $scope.truespeed / $scope.speed;
    if (ans < 0.6 || ans > 1.5) {
        $scope.color["background-color"] = "red";
    } else if (ans < 0.8 && ans > 0.6 || ans < 1.5 && ans > 1.2) {
        $scope.color["background-color"] = "yellow";
    } else {
        $scope.color["background-color"] = "green";
    }





})