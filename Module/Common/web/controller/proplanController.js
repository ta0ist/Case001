var apps = angular.module('proplan', []);
apps.controller('proplanctrl', function($scope, $http) {

    $scope.proplan_ing = [];
    $scope.proplan_un = [];
    $scope.proplan_stop = [];
    $scope.proplan_finish = [];

    $scope.proplan = {
        id: 0,
        Production_Order: "",
        Requirements_Classification: "",
        Material_Name: "",
        Inventory_Code: "",
        Product_Num: "",
        Estimated_Speed: "",
        Plan_Start_Time: "",
        Plan_End_Time: "",
        Unit: "",
        Speed_Color_One: "",
        Speed_Color_Two: "",
        Enable: "1",
        Production_Status: "N"
    };



    $('#del').children(0).eq(0).remove();



    // $http.post('/getproplan').success(function(data) {
    //     if (data.Status == 0) {
    //         $scope.proplan_ing = _.where(data.Data, { "Production_Status": "I" });
    //         $scope.proplan_un = _.where(data.Data, { "Production_Status": "N" });
    //         $scope.proplan_stop = _.where(data.Data, { "Production_Status": "S" });
    //         $scope.proplan_finish = _.where(data.Data, { "Production_Status": "F" });

    //     } else {
    //         alert(data.Message);
    //     }
    //     setTimeout(App.init, 500);
    //     setTimeout(App.dataTables, 500);
    //     setTimeout($scope.ini, 200);

    //     setTimeout(read, 500, $scope.proplan_ing, 'datatable2');
    //     setTimeout(read, 500, $scope.proplan_un, 'datatable3');
    //     setTimeout(read, 500, $scope.proplan_stop, 'datatable4');
    //     setTimeout(read, 500, $scope.proplan_finish, 'datatable5');
    // })

    //获取数据
    $http.post('/getproplan_un').success(function(data) {
        if (data.Status == 0) {
            $scope.proplan_un = data.Data;
        } else {
            alert(data.Message)
        }
        setTimeout(App.init, 500);
        setTimeout(App.dataTables, 500);
        setTimeout($scope.ini_un, 200);
        setTimeout(read, 500, $scope.proplan_un, 'datatable3');

    })

    $http.post('/getproplan_ing').success(function(data) {
        if (data.Status == 0) {
            $scope.proplan_ing = data.Data;
        } else {
            alert(data.Message)
        }
        setTimeout(read, 500, $scope.proplan_ing, 'datatable2');
    })

    $http.post('/getproplan_stop').success(function(data) {
        if (data.Status == 0) {
            $scope.proplan_stop = data.Data;
        } else {
            alert(data.Message)
        }
        setTimeout(read, 500, $scope.proplan_stop, 'datatable4');
    })

    $http.post('/getproplan_finish').success(function(data) {
        if (data.Status == 0) {
            $scope.proplan_finish = data.Data;
        } else {
            alert(data.Message)
        }
        setTimeout(read, 500, $scope.proplan_finish, 'datatable5');
    })


    //导入EXCEL
    $scope.importExcel = function() {
        $http.post('/importExcel').success(function(data) {
            if (data.Status == 0) {
                $.gritter.add({
                    position: 'bottom-right',
                    title: '导入排产计划成功！',
                    text: data.Message,
                    class_name: 'success'
                });
            }
        })

    }





    //删除
    $scope.deleteproplan = function(index) {
        $http.post('/deleteproplan', { id: $scope.proplan_un[index].ID }).success(function(data) {
            if (data.Status == 0) {
                $.gritter.add({
                    position: 'bottom-right',
                    title: '删除排产计划成功！',
                    class_name: 'success'
                });

            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '删除排产计划失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }

    $scope.isSelected = function(data) {
        if (data == 1) { return true; } else { return false; }
    }



    //更新



    $scope.bindModel = function(index) {
        $scope.proplan = $scope.proplan_un[index];
        $scope.proplan.Plan_Start_Time = moment($scope.proplan.Plan_Start_Time).format('YYYY-MM-DD HH:mm:ss');
        $scope.proplan.Plan_End_Time = moment($scope.proplan.Plan_End_Time).format('YYYY-MM-DD HH:mm:ss');
    }
    $scope.updateproplan = function() {

        $http.post('/updateproplan', { model: $scope.proplan }).success(function(data) {
            if (data.Status == 0) {


                $.gritter.add({
                    position: 'bottom-right',
                    title: '修改排产计划成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '修改排产计划失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }



    //新增
    $scope.add = function() {

        $http.post('/addproplan', { model: $scope.proplan }).success(function(data) {


            if (data.Status == 0) {
                var newObject = $.extend({}, $scope.proplan);
                $scope.proplan_un.push(newObject);



                $.gritter.add({
                    position: 'bottom-right',
                    title: '新增排产计划成功！',
                    class_name: 'success'
                });



            } else {
                $.gritter.removeAll({
                    after_close: function() {
                        $.gritter.add({
                            position: 'bottom-right',
                            title: '新增排产计划失败！',
                            text: data.Message,
                            class_name: 'danger'
                        });
                    }
                });
            }
        })
    }


    //启用(未开始)
    $scope.ini_un = function() {
        $('.switch').on('switch-change', function(event, state) {
            var plan_id = $(this).attr('id');
            var id = 0;
            if ($(this).hasClass('data_unpro')) {
                $scope.proplan_un[plan_id].Enable = 1 - $scope.proplan_un[plan_id].Enable;
                id = $scope.proplan_un[plan_id].ID;
            } else {
                $scope.proplan_stop[plan_id].Enable = 1 - $scope.proplan_stop[plan_id].Enable;
                id = $scope.proplan_stop[plan_id].ID
            }

            $http.post('/lockplan', { id: id }).success(function(data) {
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




})

apps.filter('getdate', function() {
    return function(input) {
        if (input != "" && input != null)
            return moment(input).format('YYYY-MM-DD HH:mm:ss');
        else
            return null;
    }
})

function read(proplanlist, id) {
    function fnFormatDetails(oTable, nTr) {
        var aData = oTable.fnGetData(nTr);
        var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
        var pro = proplanlist[aData[1] - 1];
        sOut += '<tr><td>预计速度</td><td>' + pro.Estimated_Speed + '</td></tr>';
        sOut += '<tr><td>生产单位</td><td>' + pro.Unit + '</td></tr>';
        sOut += '<tr><td>需求分类</td><td>' + pro.Requirements_Classification + '</td></tr>';
        sOut += '<tr><td>累计完工数量</td><td>' + pro.Production_Num + '</td></tr>';
        sOut += '<tr><td>实际开始时间</td><td>' + moment(pro.Actual_Start_Time).format('YYYY-MM-DD HH:mm:ss') + '</td></tr>';
        sOut += '<tr><td>实际结束时间</td><td>' + moment(pro.Actual_End_Time).format('YYYY-MM-DD HH:mm:ss') + '</td></tr>';
        sOut += '<tr><td>速度警报I级范围</td><td>' + pro.Speed_Color_One + '</td></tr>';
        sOut += '<tr><td>速度警报II级范围</td><td>' + pro.Speed_Color_Two + '</td></tr>';
        sOut += '</table>';

        return sOut;
    }
    var nCloneTh = document.createElement('th');
    var nCloneTd = document.createElement('td');
    nCloneTd.innerHTML = '<img class="toggle-details" src="images/plus.png" />';
    nCloneTd.className = "center sear";
    $('.sear').attr('width', '36px');
    $('#' + id + ' thead tr').each(function() {
        this.insertBefore(nCloneTh, this.childNodes[0]);
    });

    $('#' + id + ' tbody tr').each(function() {
        this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
    });

    var oTable = $('#' + id + '').dataTable({
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": [0] }
        ],
        "aaSorting": [
            [1, 'asc']
        ]
    });


    $('#' + id + '').delegate('tbody td img', 'click', function() {
        var nTr = $(this).parents('tr')[0];
        if (oTable.fnIsOpen(nTr)) {

            this.src = "images/plus.png";
            oTable.fnClose(nTr);
        } else {

            this.src = "images/minus.png";
            oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
        }
    });

    $('.dataTables_filter input').addClass('form-control').attr('placeholder', '搜索');
    $('.dataTables_length select').addClass('form-control');
}