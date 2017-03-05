angular.module('person', []).controller('personctrl', function($scope, $http) {


    $scope.personlist = [];
    $scope.person = {
        Person_No: "",
        Person_Name: "",
        Person_Tel: "",
        Person_Enable: "1"

    };

    $(".cl-mcont").parent().removeAttr('href');
    //获取用户
    $http.post('/getpersonInfor').success(function(data) {
        if (data.Status == 0) {
            $scope.personlist = data.Data;

        } else {
            alert(data.Message);
        }
        setTimeout(App.init, 100);
        setTimeout(App.dataTables, 100);
        setTimeout($scope.ini, 200);
    })



    //更新用户
    $scope.bindModel = function(index) {
        $scope.person = $scope.personlist[index]

    }
    $scope.updatepersonInfor = function() {
        $http.post('/updatepersonInfor', { model: $scope.person }).success(function(data) {
            if (data.Status == 0) {


                $.gritter.add({
                    position: 'bottom-right',
                    title: '修改人员成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '修改人员失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                })
            }
        })
    }



    //删除用户
    $scope.bindmodel = function(index) {
        $scope.bindmodel = $scope.personlist[index]

    }
    $scope.deletepersonInfor = function(bindmodel) {

        $http.post('/deletepersonInfor', { id: $scope.bindmodel.ID }).success(function(data) {
            if (data.Status == 0) {

                $.gritter.add({
                    position: 'bottom-right',
                    title: '删除人员成功！',
                    class_name: 'success'
                });

            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '删除人员失败！',
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

        $http.post('/addpersonInfor', { model: $scope.person }).success(function(data) {



            if (data.Status == 0) {
                var newObject = $.extend({}, $scope.person);
                $scope.personlist.push(newObject);



                $.gritter.add({
                    position: 'bottom-right',
                    title: '新增人员成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '新增人员失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }


    $scope.ini = function() {
        $('.switch').on('switch-change', function(event, state) {
            var person_id = $(this).attr('id');
            $scope.personlist[person_id].Person_Enable = 1 - $scope.personlist[person_id].Person_Enable;
            $http.post('/lockperson', { model: $scope.personlist[person_id] }).success(function(data) {
                if (data.Status == 0) {

                    $.gritter.add({
                        position: 'bottom-right',
                        title: '操作成功！',
                        class_name: 'success'
                    });

                } else {
                    $.gritter.removeAll({
                        after_close: function() {
                            $.gritter.add({
                                position: 'bottom-right',
                                title: '操作失败！',
                                text: data.Message,
                                class_name: 'danger'
                            });
                        }
                    });
                }
            })
        })
    }
    $scope.isSelected = function(data) {
        if (data == 1) { return true; } else { return false; }
    }






})