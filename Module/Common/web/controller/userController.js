angular.module('user', []).controller('userctrl', function($scope, $http) {


    $scope.userlist = [];
    $scope.user = {
        User_Name: "",
        User_Memo: "",
        User_Enable: "1",
        User_Password: "",
        User_ID: ""

    };


    $(".cl-mcont").parent().removeAttr('href');

    //获取用户
    $http.post('/getuser').success(function(data) {
        if (data.Status == 0) {
            $scope.userlist = data.Data;

        } else {
            alert(data.Message);
        }
        setTimeout(App.init, 100);
        setTimeout(App.dataTables, 100);
        setTimeout($scope.ini, 200);
    })

    //更新用户
    $scope.bindModel = function(index) {
        $scope.user = $scope.userlist[index]
    }

    $scope.updateuser = function() {
        $http.post('/updateuser', { model: $scope.user }).success(function(data) {
            if (data.Status == 0) {


                $.gritter.add({
                    position: 'bottom-right',
                    title: '修改用户成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '修改用户失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }

    //密码重置
    $scope.rePassword = "";
    $scope.bindpassword = function(index) {
        $scope.user = $scope.userlist[index]
    }
    $scope.updatepassward = function() {
        $http.post('/updatepassward', { model: $scope.user }).success(function(data) {
            if ($scope.user.User_Password != $scope.rePassword) {
                $.gritter.add({
                    position: 'bottom-right',
                    title: '修改密码失败！',
                    text: '两次密码不一致!',
                    class_name: 'danger'
                });

            } else {
                if (data.Status == 0) {
                    $.gritter.add({
                        position: 'bottom-right',
                        title: '修改密码成功！',
                        class_name: 'success'
                    });



                } else {
                    $.gritter.removeAll({
                        after_close: function() {
                            $.gritter.add({
                                position: 'bottom-right',
                                title: '修改密码失败！',
                                text: data.Message,
                                class_name: 'danger'
                            });
                        }
                    });
                }
            }


        })
    }


    //删除用户

    $scope.bindmodel = function(index) {

        $scope.bindmodel = $scope.userlist[index]
    };


    $scope.DeleteUserInfor = function(bindmodel) {
        $http.post('/DeleteUserInfor', { userId: $scope.bindmodel.User_ID }).success(function(data) {
            if (data.Status == 0) {
                $.gritter.add({
                    position: 'bottom-right',
                    title: '删除用户成功！',
                    class_name: 'success'
                });

            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '删除用户失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })

    }


    //按钮启用禁用
    $scope.ini = function() {
        $('.switch').on('switch-change', function(event, state) {
            var user_id = $(this).attr('id');
            $scope.userlist[user_id].User_Enable = 1 - $scope.userlist[user_id].User_Enable;
            $http.post('/lockuser', { model: $scope.userlist[user_id] }).success(function(data) {
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



    //新增用户
    $scope.add = function() {
        if ($scope.user.User_Password != $scope.newPassword) {
            $.gritter.add({
                position: 'bottom-right',
                title: '新增用户失败！',
                text: '两次密码不一致!',
                class_name: 'danger'
            });

        } else {
            $http.post('/addUserInfor', { model: $scope.user }).success(function(data) {



                if (data.Status == 0) {
                    var newObject = $.extend({}, $scope.user);
                    $scope.userlist.push(newObject);



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

    }



})