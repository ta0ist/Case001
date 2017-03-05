angular.module('product', []).controller('productctrl', function($scope, $http) {


    $scope.productlist = [];
    $scope.product = {
        PRODUCT_TYPE: "",
        ESTIMATED_SPEED: ""
    };

    //获取产品
    $http.post('/getProduct').success(function(data) {
            if (data.Status == 0) {
                $scope.productlist = data.Data;

            } else {
                alert(data.Message);
            }
            setTimeout(App.init, 100);
            setTimeout(App.dataTables, 100);
            setTimeout($scope.ini, 200);
        })
        //更新产品
    $scope.updateproduct = function(index) {
        $http.post('/updateProductInfor', { model: $scope.productlist[index] }).success(function(data) {

        })
    }

    //删除产品
    $scope.DeleteProductInfor = function(index) {
        $http.post('/DeleteProductInfor', { model: $scope.productlist[index] }).success(function(data) {
            if (data.Status == 0) {

                $.gritter.add({
                    position: 'bottom-right',
                    title: '操作成功！',
                    class_name: 'success'
                });

            }
        })
    }

    //新增用户
    $scope.add = function() {

        $http.post('/addProductInfor', { model: $scope.product }).success(function(data) {



            if (data.Status == 0) {
                var newObject = $.extend({}, $scope.product);
                $scope.productlist.push(newObject);



                $.gritter.add({
                    position: 'bottom-right',
                    title: '新增用户成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '新增用户失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }

    $scope.AddProductInfor = function(index) {
        $http.post('/AddProductInfor', { model: $scope.productlist[index] }).success(function(data) {


        })
    }











})