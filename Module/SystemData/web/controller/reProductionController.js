var app = angular.module('reProduction', [])
app.controller('reProductionctrl', function($scope, $http) {
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    var alldata = {
        "A001": [{
            "time": '2009/10/18 6:00:01',
            "value": 50
        }, {
            "time": '2009/10/18 6:00:02',
            "value": 45
        }, {
            "time": '2009/10/18 6:00:03',
            "value": 47
        }, {
            "time": '2009/10/18 6:00:04',
            "value": 43
        }, {
            "time": '2009/10/18 6:00:05',
            "value": 42
        }, {
            "time": '2009/10/18 6:00:06',
            "value": 40
        }]
    }

    $scope.search = function() {
        var timeData = [];
        var data = [];
        var m = 0;
        for (var i = 0; i < alldata.A001.length; i++) {
            timeData.push(alldata.A001[i].time);
            data.push(alldata.A001[i].value);
            if (m < alldata.A001[i].value) {
                m = alldata.A001[i].value;
            }
        }
        chart(myChart, option, timeData, data, m);
    }


    // timeData = timeData.map(function(str) {
    //     return str.replace('2009/', '');
    // });


})

function chart(myChart, option, timeData, data, max) {
    option = {
        title: {
            text: '产品速度图',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: ['流量'],
            x: 'left'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
                show: true,
                realtime: true,
                start: 10,
                end: 90,
                xAxisIndex: [0, 1]
            },
            {
                type: 'inside',
                realtime: true,
                start: 10,
                end: 90,
                xAxisIndex: [0, 1]
            }
        ],
        grid: [{
            left: 50,
            right: 50,
            height: '80%'
        }, {
            left: 50,
            right: 50,
            top: '88.5%',
            height: '0%'
        }],
        xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: { onZero: true },
                data: timeData
            },
            {
                gridIndex: 1,
                type: 'category',
                boundaryGap: false,
                axisLine: { onZero: true },
                data: null,
                position: 'top'
            }
        ],
        yAxis: [{
                name: '速度(m^3/s)',
                type: 'value',
                max: max * 1.4
            },
            {
                gridIndex: 1,
                name: '',
                type: 'value',
                inverse: true
            }
        ],
        series: [{
            name: '速度',
            type: 'line',
            symbolSize: 8,
            hoverAnimation: false,
            data: data
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}