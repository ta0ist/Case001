angular.module('line', []).controller('linectrl', function($scope, $http) {

    $(".cl-mcont").parent().removeAttr('href');

    $scope.linelist = [];

    $scope.btn_status = -1; //0:Add 1:update

    $scope.line = {
        Line_No: "",
        Line_Name: "",
        IP: "",
        Line_ID: "",
        Msg_Person_Name: "",
        Opt_Person_Name: ""
    };
    $scope.freepersonlist = [];
    $scope.freeperson = {
        Person_Name: "",
        Person_ID: ""
    };
    //获取产线信息
    $http.post('/getline').success(function(data) {
        if (data.Status == 0) {
            $scope.linelist = data.Data;

        } else {
            alert(data.Message);
        }
        setTimeout(App.init, 100);
        setTimeout(App.dataTables, 100);
        setTimeout($scope.ini, 200);
    })

    //获取人员
    $http.post('/getfreeperson').success(function(data) {
            if (data.Status == 0) {
                $scope.freepersonlist = data.Data;

            } else {
                alert(data.Message);
            }
        })
        // $scope.AddMgePerson = function(x) {
        //         $http.post('/AddMgePerson', { personId: x.ID, lineId: $scope.line.ID }).success(function(data) {
        //             if (data.Status != 0) {
        //                 alert(data.Message);
        //             }
        //         })
        //     }
        //更新
    $scope.bindModel = function(index) {
        $scope.line = $scope.linelist[index];
        $scope.btn_status = index;
        $('#human').css('display', '');
        $('#read').attr("readonly", "readonly");
    }
    $scope.AddMgePerson = function(x) {
        if ($scope.line != null) {
            $http.post('/UpdateLineInfor', { model: { ID: $scope.line.ID, Msg_Person_ID: x.ID } }).success(function(data) {
                if (data.Status == 0) {
                    $scope.line.Msg_Person_ID = x.ID;
                    $scope.line.Msg_Person_Name = x.Person_Name;
                    $.gritter.add({
                        position: 'bottom-right',
                        title: '添加人员成功！',
                        class_name: 'success'
                    });
                } else {
                    $.gritter.add({
                        position: 'bottom-right',
                        title: '添加人员失败！',
                        text: data.Message,
                        class_name: 'danger'
                    });
                }
            })
        }

    }
    $scope.AddOptPerson = function(x) {
        if ($scope.line != null) {
            $http.post('/AddOptPerson', { personId: x.ID, lineId: $scope.line.ID }).success(function(data) {
                if (data.Status == 0) {
                    $scope.line.Opt_Person_ID = x.ID;
                    $scope.line.Opt_Person_Name = x.Person_Name;
                    $.gritter.add({
                        position: 'bottom-right',
                        title: '添加人员成功！',
                        class_name: 'success'
                    });

                } else {
                    $.gritter.add({
                        position: 'bottom-right',
                        title: '添加人员失败！',
                        text: data.Message,
                        class_name: 'danger'
                    });
                }
            })
        }
    }
    $scope.updateline = function() {
        $http.post('/updateLine', { model: $scope.line }).success(function(data) {
            if (data.Status == 0) {
                $.gritter.add({
                    position: 'bottom-right',
                    title: '修改产线成功！',
                    class_name: 'success'
                });
            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '修改产线失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }

    //删除
    $scope.DeleteLineInfor = function(index) {
        $http.post('/DeleteLineInfor', { id: $scope.linelist[index].ID }).success(function(data) {
            if (data.Status == 0) {


                $.gritter.add({
                    position: 'bottom-right',
                    title: '删除产线成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '删除产线失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }

    //新增
    $scope.addLineInfor = function() {
        $scope.btn_status = -1;
        $http.post('/addLineInfor', { model: $scope.line }).success(function(data) {

            if (data.Status == 0) {
                var newObject = $.extend({}, $scope.lien);
                $scope.linelist.push(newObject);

                $.gritter.add({
                    position: 'bottom-right',
                    title: '新增产线成功！',
                    class_name: 'success'
                });
            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '新增产线失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }

    $scope.AddLineInfor = function(index) {
        $http.post('/addLineInfor', { model: $scope.Linelist[index] }).success(function(data) {


        })
    }

    $scope.Submit = function() {
        if ($scope.btn_status < 0) {

            $http.post('/addLineInfor', { model: $scope.line }).success(function(data) {

                if (data.Status == 0) {
                    var newObject = $.extend({}, $scope.user);
                    $scope.linelist.push(newObject);

                    $.gritter.add({
                        position: 'bottom-right',
                        title: '新增产线成功！',
                        class_name: 'success'
                    });

                } else {
                    $.gritter.removeAll({
                        after_close: function() {
                            $.gritter.add({
                                position: 'bottom-right',
                                title: '新增产线失败！',
                                text: data.Message,
                                class_name: 'danger'
                            });
                        }
                    });
                }
            })


        } else {
            $http.post('/updateLineInfor', { model: $scope.linelist[$scope.btn_status] }).success(function(data) {
                if (data.Status == 0) {
                    $.gritter.add({
                        position: 'bottom-right',
                        title: '修改产线成功！',
                        class_name: 'success'
                    });
                } else {
                    $.gritter.removeAll({
                        after_close: function() {
                            $.gritter.add({
                                position: 'bottom-right',
                                title: '修改产线失败！',
                                text: data.Message,
                                class_name: 'danger'
                            });
                        }
                    });
                }
            })
        }
    }
    $scope.add = function() {

        $scope.line = null;
        $('#human').css('display', 'none');

    }

    //新增产线
    $scope.addLineInfor = function() {

        $http.post('/addLineInfor', { model: $scope.line }).success(function(data) {

            if (data.Status == 0) {
                var newObject = $.extend({}, $scope.user);
                $scope.linelist.push(newObject);

                $.gritter.add({
                    position: 'bottom-right',
                    title: '新增产线成功！',
                    class_name: 'success'
                });

            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '新增产线失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }
})