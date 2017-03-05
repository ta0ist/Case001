var apps = angular.module('reStatus', [])
apps.controller('reStatusctrl', function($scope, $http) {
    App.init();

    $scope.statuslist = [];
    $scope.status = {
        Starttime: '',
        EndTime: '',
        Name: '',
        StatusName: ''
    }

    $('#line').selectpicker({
        'width': '200px',
    });
    $http.post('/getline').success(function(data) {
        if (data.Status == 0) {
            for (var i = 0; i < data.Data.length; i++) {
                $('#line').append("<option value=" + data.Data[i].ID + ">" + data.Data[i].Line_Name + "</option>");
            }
            $('#line').selectpicker('refresh');
        }
    })
    option = null;
    // $scope.alldata = 
    //      [{
    //         "Starttime": '2017/1/18 0:00:00',
    //         "EndTime": '2017/1/18 6:00:01',
    //         "Name": 'null',
    //         'Color': '#FFFFFF'
    //     }, {
    //         "Starttime": '2017/1/18 6:00:01',
    //         "EndTime": '2017/1/18 7:00:01',
    //         "Name": '正常',
    //         'Color': '#80ff00'
    //     }, {
    //         "Starttime": '2017/1/18 7:00:01',
    //         "EndTime": '2017/1/18 8:00:01',
    //         "Name": '关机',
    //         'Color': '#c0c0c0'
    //     }, {
    //         "Starttime": '2017/1/18 8:00:01',
    //         "EndTime": '2017/1/18 9:00:01',
    //         "Name": '调试',
    //         'Color': '#0000ff'
    //     }, {
    //         "Starttime": '2017/1/18 9:00:01',
    //         "EndTime": '2017/1/19 0:00:00',
    //         "Name": '故障',
    //         'Color': '#ff0000'
    //     }]
    // }



    $scope.search = function() {
        $http.post('/SelectLineStatus', {
                strLineName: $('#line').val(),
                startDate: $('#str_time').val(),
                endDate: $('#end_time').val(),
                lineStatus: null
            }).success(function(data) {
                if (data.Status == 0) {
                    $scope.statuslist = data.Data;
                    // for (var i = 0; i < $scope.status_list.length; i++) {

                    //     if ($scope.status_list[i].Data.length > 0) {
                    //         for (var y = 0; y < $scope.status_list[i].Data.length; y++) {
                    //             var EndTime = new Date($scope.status_list[i].Data[y].EndTime);
                    //             var Starttime = new Date($scope.status_list[i].Data[y].Starttime);
                    //             var timespan = EndTime.getTime() - Starttime.getTime();
                    //             var width = parseInt((timespan / (24 * 60 * 60 * 10) * 100));
                    //             $scope.status_list[i].Data[y].width = width / 100 + '%';
                    //         }

                    //     }
                    // }
                } else {
                    alert(data.Message);
                }

            })
            // $scope.status_list = [{
            //     Line: '56',
            //     Data: [{
            //             "Starttime": '2017/1/18 0:00:00',
            //             "EndTime": '2017/1/18 6:00:01',
            //             "Name": 'null',
            //             'Color': '#FFFFFF'
            //         }, {
            //             "Starttime": '2017/1/18 6:00:01',
            //             "EndTime": '2017/1/18 7:00:01',
            //             "Name": '正常',
            //             'Color': '#80ff00'
            //         }, {
            //             "Starttime": '2017/1/18 7:00:01',
            //             "EndTime": '2017/1/18 8:00:01',
            //             "Name": '关机',
            //             'Color': '#c0c0c0'
            //         }, {
            //             "Starttime": '2017/1/18 8:00:01',
            //             "EndTime": '2017/1/18 9:00:01',
            //             "Name": '调试',
            //             'Color': '#0000ff'
            //         }, {
            //             "Starttime": '2017/1/18 9:00:01',
            //             "EndTime": '2017/1/19 0:00:00',
            //             "Name": '故障',
            //             'Color': '#ff0000'
            //         }

        //     ]
        // }, {
        //     Line: '57',
        //     Data: [{
        //             "Starttime": '2017/1/18 0:00:00',
        //             "EndTime": '2017/1/18 6:00:01',
        //             "Name": 'null',
        //             'Color': '#FFFFFF'
        //         }, {
        //             "Starttime": '2017/1/18 6:00:01',
        //             "EndTime": '2017/1/18 7:00:01',
        //             "Name": '正常',
        //             'Color': '#80ff00'
        //         }, {
        //             "Starttime": '2017/1/18 7:00:01',
        //             "EndTime": '2017/1/18 8:00:01',
        //             "Name": '关机',
        //             'Color': '#c0c0c0'
        //         }, {
        //             "Starttime": '2017/1/18 8:00:01',
        //             "EndTime": '2017/1/18 9:00:01',
        //             "Name": '调试',
        //             'Color': '#0000ff'
        //         }, {
        //             "Starttime": '2017/1/18 9:00:01',
        //             "EndTime": '2017/1/18 13:00:00',
        //             "Name": '故障',
        //             'Color': '#ff0000'
        //         },
        //         {
        //             "Starttime": '2017/1/18 13:00:00',
        //             "EndTime": '2017/1/19 0:00:00',
        //             "Name": '正常',
        //             'Color': '#80ff00'
        //         }

        //     ]
        // }, {
        //     Line: '59',
        //     Data: [{
        //             "Starttime": '2017/1/18 0:00:00',
        //             "EndTime": '2017/1/18 6:00:01',
        //             "Name": 'null',
        //             'Color': '#FFFFFF'
        //         }, {
        //             "Starttime": '2017/1/18 6:00:01',
        //             "EndTime": '2017/1/18 7:00:01',
        //             "Name": '正常',
        //             'Color': '#80ff00'
        //         }, {
        //             "Starttime": '2017/1/18 7:00:01',
        //             "EndTime": '2017/1/18 8:00:01',
        //             "Name": '关机',
        //             'Color': '#c0c0c0'
        //         }, {
        //             "Starttime": '2017/1/18 8:00:01',
        //             "EndTime": '2017/1/18 9:00:01',
        //             "Name": '调试',
        //             'Color': '#0000ff'
        //         }, {
        //             "Starttime": '2017/1/18 9:00:01',
        //             "EndTime": '2017/1/18 13:00:00',
        //             "Name": '故障',
        //             'Color': '#ff0000'
        //         },
        //         {
        //             "Starttime": '2017/1/18 13:00:00',
        //             "EndTime": '2017/1/19 0:00:00',
        //             "Name": '正常',
        //             'Color': '#80ff00'
        //         }

        //     ]
        // }];

        // for (var i in $scope.alldata) {
        //     alert(i);
        // }
    }

    // timeData = timeData.map(function(str) {
    //     return str.replace('2009/', '');
    // });



})