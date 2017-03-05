var apps = angular.module('board', [])

apps.controller('boardctrl', function($scope, $http) {

    $scope._histroy_index = -1;
    $scope.address = '';
    $scope.personId = '';
    $scope.orderStatus = '';
    $scope.boardlist = [];
    $scope.board = {
        Production_Order: "",
        Production_Status: "",
        Person_Name: "",
        Line_ID: 0,
        Line_Name: "",
        Requirements_Classification: "",
        Inventory_Code: "",
        Material_Name: "",
        Product_Num: "",
        Un_Production_Num: "",
        Production_Num: "",
        Estimated_Speed: "",
        Mge_Person_ID: "",
        Person_Tel: "",
        Opt_Person_ID: "",
        Production_Num: 0,
        Actual_Start_Time: null,
        Production_Id: 0,
        ShowContent: ""
    };
    $scope.NowProductionSpeed = 0;



    $http.get('/getIP').success(function(data) {
        if (data.ip == '1') {
            data.ip = '192.168.1.100';
        }
        $scope.address = data.ip;
        $http.post('/GetPadModelByIP', { address: $scope.address }).success(function(result) {
            if (result.Status == 0) {
                $scope.board = result.Data;
                $scope.getOrderSpeed(1000);
                $scope.getOrderYeild(1000);
            }
        })



    })

    $scope.tr_click = function(index) {
        $scope.focus = index;
        if ($scope._histroy_index == -1) {

        } else {
            switch ($scope.boardlist[$scope._histroy_index].Production_Status) {
                case 'N':
                    $('#start').removeClass('btn-info');
                    break;
                case 'S':
                    $('#stop').removeClass('btn-danger');
                    break;
                case 'F':
                    $('#finish').removeClass('btn-success');
                    break;
                case 'I':
                    $('#start').removeClass('btn-primary');
                    break;
            }
        }
        switch ($scope.boardlist[index].Production_Status) {
            case 'N':
                $('#start').addClass('btn-info');
                break;
            case 'S':
                $('#stop').addClass('btn-danger');
                break;
            case 'F':
                $('#finish').addClass('btn-success');
                break;
            case 'I':
                $('#start').addClass('btn-primary');
                break;
        }
        $scope._histroy_index = index;
    }


    $scope.ChangeMsgPerson = function(x) {
        $http.post('/ChangeMsgPerson', { address: $scope.address, personId: x.ID }).success(function(data) {
            if (data.Status != 0) {
                alert(data.Message);
            }
        })
    }
    $scope.ChangeOptPerson = function(y) {
        $http.post('/ChangeOptPerson', { address: $scope.address, personId: y.ID }).success(function(data) {
            if (data.Status != 0) {
                alert(data.Message);
            }
        })
    }


    $scope.start_order = function() {
        $http.post('/start_order', {})
    }

    //长按弹框

    var timeOut = 0;

    $http.get('/GetPersonInfor').success(function(data) {
        if (data.Status == 0)
            $scope.freepersonlist = data.Data;
    })

    $("#touchArea").on('mousedown', function() {
        timeout = setTimeout(function() {
            showwindows();
            //获取计划排产
            $http.post('/getunfinishproduct', { address: $scope.address }).success(function(data) {
                if (data.Status == 0) {
                    $scope.boardlist = data.Data;

                } else {
                    alert(data.Message);
                }
            });
        }, 150);
    });
    $("#touchArea").on('mouseup', function() {
        clearTimeout(timeout);
    });
    //订单开始
    $scope.start = function() {
            $http.post('/ClickBegin', { address: $scope.address, productionId: $scope.boardlist[$scope.focus].ID }).success(function(data) {
                if (data.Status != 0) {
                    alert(data.Message);
                }
            });
        }
        //订单停止
    $scope.stop = function() {
            $http.post('/ClickStop', { productionId: $scope.boardlist[$scope.focus].ID }).success(function(data) {
                if (data.Status != 0) {
                    alert(data.Message);
                }
            });
        }
        //订单取消
    $scope.cancel = function() {
            $http.post('/ClickCancel', { productionId: $scope.boardlist[$scope.focus].ID }).success(function(data) {
                if (data.Status != 0) {
                    alert(data.Message);
                }
            });
        }
        //订单完成
    $scope.finish = function() {
        $http.post('/ClickComplete', { productionId: $scope.boardlist[$scope.focus].ID }).success(function(data) {
            if (data.Status != 0) {
                alert(data.Message);
            }
        });
    }

    $scope.choose = function() {

    }




    $scope.getOrderSpeed = function(time) {
        $http.post('/GetRealTimeSpeed', { address: $scope.address }).success(function(data) {
            if (data.Status == 0) {
                $scope.NowProductionSpeed = data.Data;
                var yellow = $scope.board.Estimated_Speed * (1 - $scope.board.Speed_Color_One / 100);
                var red = $scope.board.Estimated_Speed * (1 - $scope.board.Speed_Color_Two / 100);
                if ($scope.NowProductionSpeed >= yellow) {
                    $scope.color = {
                        'color': 'green'
                    }
                } else if ($scope.NowProductionSpeed < yellow && $scope.NowProductionSpeed > red) {
                    $scope.color = {
                        'color': 'yellow'
                    }
                } else {
                    $scope.color = {
                        'color': 'red'
                    }
                }

            } else {
                alert(data.Message);
            }
        });
        setTimeout($scope.getOrderSpeed, 1000);
    }

    $scope.getOrderYeild = function(time) {
        $scope.board.Actual_Start_Time = moment($scope.board.Actual_Start_Time).format('YYYY-MM-DD HH:mm:ss');
        $http.post('/GetRealYieldNum', { lineId: $scope.board.Line_ID, productionId: $scope.board.Production_Id, startTime: $scope.board.Actual_Start_Time }).success(function(data) {
            if (data.Status == 0) {
                $scope.board.Production_Num = data.Data;

            } else {
                alert(data.Message);
            }
        });
        setTimeout($scope.getOrderYeild, 1000);
    }

    $scope.Normal = function() {
        $http.post('/DeviceRunStatus', { lineId: $scope.board.Line_ID, iStatusValus: 1 }).success(function(data) {
            if (data.Status != 0) {
                alert(data.Message);
            }
        });
    }
    $scope.Test = function() {
        $http.post('/DeviceRunStatus', { lineId: $scope.board.Line_ID, iStatusValus: 2 }).success(function(data) {
            if (data.Status != 0) {
                alert(data.Message);
            }
        });
    }
    $scope.Alarm = function() {
        $http.post('/DeviceRunStatus ', { lineId: $scope.board.Line_ID, iStatusValus: 4 }).success(function(data) {
            if (data.Status != 0) {
                alert(data.Message);
            }
        });
    }

})


function showwindows() {
    $('#btnn').trigger('click');
}

function changewidth() {
    $('#datatable_wrapper').css('width', '1550px');
    $('#datatable_wrapper').css('margin-left', '20px');
}

$('#nomal').click(function() {
    $('#nomal').addClass('btn-success');
    $('#debug').removeClass('btn-warning');
    $('#fault').removeClass('btn-danger');
});
$('#debug').click(function() {
    $('#nomal').removeClass('btn-success');
    $('#debug').addClass('btn-warning');
    $('#fault').removeClass('btn-danger');
});
$('#fault').click(function() {
    $('#nomal').removeClass('btn-success');
    $('#debug').removeClass('btn-warning');
    $('#fault').addClass('btn-danger');
});
$('#start').click(function() {
    $('#start').addClass('btn-primary');
    $('#stop').removeClass('btn-danger');
    $('#cancel').removeClass('btn-warning');
    $('#finish').removeClass('btn-success');
});
$('#stop').click(function() {
    $('#start').removeClass('btn-primary');
    $('#stop').addClass('btn-danger');
    $('#cancel').removeClass('btn-warning');
    $('#finish').removeClass('btn-success');
});
$('#cancel').click(function() {
    $('#start').removeClass('btn-primary');
    $('#stop').removeClass('btn-danger');
    $('#cancel').addClass('btn-warning');
    $('#finish').removeClass('btn-success');
});
$('#finish').click(function() {
    $('#start').removeClass('btn-primary');
    $('#stop').removeClass('btn-danger');
    $('#cancel').removeClass('btn-warning');
    $('#finish').addClass('btn-success');
});
apps.filter('status', function() {
    return function(input) {
        switch (input) {
            case 'N':
                return '未开始';
            case 'S':
                return '停止';
            case 'F':
                return '完成';
            case 'I':
                return '进行中';
        }
    }
})