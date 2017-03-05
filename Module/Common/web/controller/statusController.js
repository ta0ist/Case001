angular.module('status', []).controller('statusctrl', function($scope, $http) {
    $scope.statuslist = [];
    $scope.status = {
        Status_ID: "",
        Name: "",
        Status_Color: ""
    };


    $(".cl-mcont").parent().removeAttr('href');


    //获取用户
    $http.post('/getstatusInfor').success(function(data) {
        if (data.Status == 0) {
            $scope.statuslist = data.Data;

        } else {
            alert(data.Message);
        }

        setTimeout(App.init, 100);
        setTimeout(App.dataTables, 100);
        setTimeout(inicolor, 100);
    })


    //更新用户
    $scope.bindModel = function(index) {
        $scope.status = $scope.statuslist[index]

    }

    $scope.updatestatusInfor = function() {
        $http.post('/updatestatusInfor', { model: $scope.status }).success(function(data) {
            if (data.Status == 0) {


                $.gritter.add({
                    position: 'bottom-right',
                    title: '修改状态成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '修改状态失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }
 

    //删除用户
    $scope.bindmodel = function(index) {
        $scope.bindmodel = $scope.statuslist[index]
    }

    $scope.deletestatusInfor = function(bindmodel) {
        $http.post('/deletestatusInfor', { id: $scope.bindmodel.ID }).success(function(data) {
            if (data.Status == 0) {

                $.gritter.add({
                    position: 'bottom-right',
                    title: '删除状态成功！',
                    class_name: 'success'
                });

            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '删除状态失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })

    }



    //新增用户
    $scope.add = function() {

        $http.post('/addstatusInfor', { model: $scope.status }).success(function(data) {



            if (data.Status == 0) {
                var newObject = $.extend({}, $scope.status);
                $scope.statuslist.push(newObject);



                $.gritter.add({
                    position: 'bottom-right',
                    title: '新增状态成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '新增状态失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }

})

function inicolor() {
    $('.color').onchange = function() {
        alert(this.val());
    }
}