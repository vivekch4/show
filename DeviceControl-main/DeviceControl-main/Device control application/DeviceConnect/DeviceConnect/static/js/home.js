function submitAutoSchdule() {
    let startTime = $("#automaticStartTime").val();
        let endTime = $("#automaticEndTime").val();
    var automaticlist = []
    $.each($(".autoallschedule"), function (index, value) {
debugger;

 if(value.checked)
 {
 automaticlist.push({
            "startTime": startTime.split("T")[0] + " " + startTime.split("T")[1],
                        "endTime": endTime.split("T")[0] + " " + endTime.split("T")[1],
            "value": $("#" + value.name).val(),
            "rgistId":value.name,
            "outPutValue":value.parentElement.parentElement.parentElement.firstChild.outerText
        })
 }

    })

    $.ajax({
        type: "POST",
        url: "/automatic/",
        data: {"data": JSON.stringify(automaticlist)},
        success: function (result) {

         var html = '    <h4 style="margin-left: 24px;color: blanchedalmond;">Outputs control switch</h4>';

            var i = 1;
            html += '<div class="row">';
            $.each(result, function (index, item) {

                var data = JSON.parse(item)
                debugger;
                var status = '<img style="height: 26px;" src="../../media/button-red-150x150.png">';
                var isChked = '<input class="autoallschedule" type="checkbox"  name=' + data.name + '>'


                if (i % 3 != 0) {

                    if (data.isChecked) {
                        status = '<img style="height: 26px; " src="../../media/OIP.png">';
                        isChked = '<input class="autoallschedule" type="checkbox" checked name=' + data.name + '>'
                    }
                    html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div class="col-sm-3">'+isChked+'</div><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'

                } else {

                    if (data.isChecked) {
                        status = '<img style="height: 26px; width: 31px;margin-left: 4px;margin-top: 0px;" src="../../media/OIP.png">';
                    }
                    html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div class="col-sm-3"><input class="autoallschedule" type="checkbox" name=' + data.name + '></div><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'
                }
                i++;


            })
            html += '</div>'
            $("#automatic_Control").html(html);


        }
    })


}

function selectAllAutoChk() {
    let isAllChecked = $("#automaticSelectAll").is(':checked')
    if (isAllChecked) {
        $(".autoallschedule").attr("checked", "checked");
    } else {
        $(".autoallschedule").removeAttr("checked");
    }
}

function AutomaticOutput() {
    $("#manual_light_row").css("display", "none")
    $("#automatic_light_row").css("display", "block")
    $("#wrapper").css("display", "block")
    $.ajax({
        type: "GET",
        url: "/show_LightList",
        success: function (result) {
            var html = '    <h4 style="margin-left: 24px;color: blanchedalmond;">Outputs control switch</h4>';

            var i = 1;
            html += '<div class="row">';
            $.each(result, function (index, item) {

                var data = JSON.parse(item)
                debugger;
                var status = '<img style="height: 26px;" src="../../media/button-red-150x150.png">';


                if (i % 3 != 0) {

                    if (data.isChecked) {
                        status = '<img style="height: 26px; " src="../../media/OIP.png">';
                    }
                    html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div class="col-sm-3"><input class="autoallschedule" type="checkbox" name=' + data.name + '></div><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'

                } else {

                    if (data.isChecked) {
                        status = '<img style="height: 26px; width: 31px;margin-left: 4px;margin-top: 0px;" src="../../media/OIP.png">';
                    }
                    html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div class="col-sm-3"><input class="autoallschedule" type="checkbox" name=' + data.name + '></div><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'
                }
                i++;


            })
            html += '</div>'
            $("#automatic_Control").html(html);

        }
    });

}

function AutomaticSubmit() {
    $("#automatictime").val();
    $("#automaticSelectAll").is(':checked')
}

function ExportData() {
    $.ajax({
        type: "GET",
        url: "/ReadHistory/",
        success: function (result) {
            debugger;
            let list1 = []
            list1.push(result);
            let data = list1[0]
            let date = new Date();
            let month = date.getMonth() + 1;
            let filename = 'reports' + date.getFullYear() + month + date.getDate() + date.getHours() + date.getMinutes() + '.xlsx';
            let ws = XLSX.utils.json_to_sheet(data);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "People");
            XLSX.writeFile(wb, filename);
        }
    });


}


function empty() {
    $.ajax({
        type: "GET",
        url: "/empty/",
        success: function (result) {
            alert("feefesf")
        },
    });
}


function EMSFUN() {
    $("#individuallight").css("display", "none")
    $("#manual_light_row").css('display', "none")
    $("#config_row").css("display", "none")
    $(".button1").css("display", "none")
    
}

function exportExcel() {
    $.ajax({
        type: "GET",
        url: "/export/",
        success: function (result) {
            if (result) {

                Swal.fire({
                    title: "<h4>Sucess<h4>",
                    html: "Your download is completed"
                });
            } else {

                Swal.fire({
                    title: "<h4>Fail<h4>",
                    html: "Something went wrong! Please try again"
                });
            }
        },
    });
}


function individuallight() {

    if ($("#individuallight div").length == 0) {
        $("#automatic_light_row").css("display", "none")
        $("#wrapper").css("display", "block")
        $.ajax({
            type: "GET",
            url: "/show_LightList",
            success: function (result) {
                var html = '    <h4 style="margin-left: 24px;color: blanchedalmond;">Outputs control switch</h4>';

                var i = 1;
                html += '<div class="row">';
                $.each(result, function (index, item) {

                    var data = JSON.parse(item)
                    debugger;
                    var status = '<img style="height: 26px;" src="../../media/button-red-150x150.png">';


                    if (i % 3 != 0) {

                        if (data.isChecked) {
                            status = '<img style="height: 26px; " src="../../media/OIP.png">';
                        }
                        html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'

                    } else {

                        if (data.isChecked) {
                            status = '<img style="height: 26px; width: 31px;margin-left: 4px;margin-top: 0px;" src="../../media/OIP.png">';
                        }
                        html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'
                    }
                    i++;


                })
                html += '</div>'
                $("#individuallight").html(html);

            }
        });

        document.getElementById("manual_light_row").style.display = "block";

    } else {
        Swal.fire({
            title: "<h4>Reset the connection<h4>",
            html: "if you want ot increase the light reset the connection"
        });

    }
}

$(document).on('click', '#config_outputregister #registerConfig_Save', function (event) {
    var list = [];
    var index = -1
    $.each($("#config_outputregister .configOutput_row"), function (index, value) {

        var regist = $(this)[0].children[1].children[0].value
        var lable = $(this)[0].children[0].children[0].value
        index = index + 1
        list.push({
            "lable": lable,
            "value": regist,
            "configOutput_row": "configOutput_row" + index,
            "registindividualValue": "registindividualValue" + index,
            "outputLabel": "outputLabel" + index
        })


    });

    $.ajax({
        type: "POST",
        url: "/settings/",
        data: {"data": JSON.stringify(list)},
        success: function (result) {
        },
    });

})


$(document).on('click', '#individuallight .individuallight', function (event) {
    debugger;

    var regist_id = event.currentTarget.name;
    var regist_val = $("#" + regist_id).val();
    var outPutValue = event.currentTarget.parentElement.parentElement.parentElement.firstChild.outerText;//event.currentTarget.parentElement.firstChild.innerText

    $.ajax({
        type: "POST",
        url: "/individualLight/",
        data: {
            "outPutValue": outPutValue,
            "registerValue": regist_val,
            "rgistId": regist_id,
            "isChecked": (event.currentTarget.id.includes("on")) ? true : false,
        },
        success: function (result) {debugger;
            var html = '    <h4 style="margin-left: 24px;color: blanchedalmond;">Outputs control switch</h4>';
            debugger
            var i = 1;
            html += '<div class="row">'
            $.each(result, function (index, item) {
                var data = JSON.parse(item)

                var status = '<img style="height: 26px; " src="../../media/button-red-150x150.png">';


                if (i % 3 != 0) {

                    if (data.isChecked) {
                        status = '<img style="height: 26px; width: 31px;margin-left: 4px;margin-top: 0px;" src="../../media/OIP.png">';
                    }
                    html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'

                } else {

                    if (data.isChecked) {
                        status = '<img style="height: 26px;" src="../../media/OIP.png">';
                    }
                    html += '<div class="col-sm-3"><div class="row"><label>' + data.label + '</label></div><div class="row"><div hidden class="col-sm-3"><input hidden type="text" id=' + data.name + ' value = ' + data.value + '></div><div class="col-sm-3"><input class = "button individuallight btn-rounded btn-fw" type ="button" name = ' + data.name + ' id  = on' + data.chkboxid + ' value = "ON" style="background-color: lightgreen;border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;"/></div><div class="col-sm-3"><input class  = "button individuallight btn-rounded btn-fw" style="background-color: red; border-bottom-left-radius: 50px;border-bottom-right-radius: 50px;border-top-left-radius: 50px;border-top-right-radius: 50px;" type ="button" name = ' + data.name + ' id  = off' + data.chkboxid + ' value = "OFF"/></div><div class="col-sm-3"><div>' + status + ' </div></div></div></div>'
                }
                i++;


            })
            html += '/div>';
            $("#individuallight").html(html);
        }
    });


})


function openNavBar() {
    debugger;
    $("#config_row").css("display", "none")
    document.getElementById("button_light_row").style.display = "block";

    // document.getElementById("wrapper").style.display = "block";
    document.getElementById("config_main_div").style.display = "block";


    $("#config_main_div").css("display", "block")


}

$(".device-connect").on("click", function (e) {

    if (e.target.id == 'configsetting') {
        var count = $("#lightCount_Id").val()
        var html = ''
        var i = 0;
        while (i < count) {
            html += '<div class = "configOutput_row" id ="configOutput_row' + i + '" style="margin-top: 19px;display: flex;"><div id="configOutput_col1" style="margin-inline: 43px;"><input class="form-control" type="text" id="outputLabel' + i + '" value="" placeholder="Enter the Output Label"/></div><div id="configOutput_col2"><input class="form-control" type="text" id="registindividualValue' + i + '" value="" placeholder="Enter the Register value"/></div></div>'
            i++;

        }

        html += '<input class="btn-rounded btn-fw btn btn-primary btn-icon-text" style="position: relative; right: 227px; font-size: smaller;margin-inline: 42px;margin-top: 12px; color: white;" type="button" value="Save" id = "registerConfig_Save"/>'
        $("#config_outputregister").html(html);
    } else if (e.target.id == 'connect') {
        $.ajax({
            type: "POST",
            url: "/device_Connect/",
            data: {
                "ip_address_id": $("#ip_address_id").val(),
                "filter": e.target.id,
                "lightCount_Id": $("#lightCount_Id").val()
            },
            success: function (result) {
                if (result) {
                    Swal.fire({
                        title: "<h4>Connection Success</h4>",
                        html: "Connection established successfully",
                    }).then((result) => {

                        location.reload()


                    });

                }

            },
            error: function (result) {
                Swal.fire({
                    title: "<h4>Connection Fail<h4>",
                    html: "The Following are the possible cause.</br> <ul><li> Commnucation time was up (cable disconnect, network error/high load or the specified transmission speed is not supported)</li> <li>Mismatch Ip Address</li></ul> "
                });

            }

        });


    } else if (e.target.id == 'disconnect') {
        $.ajax({
            type: "POST",
            url: "/device_Connect/",
            data: {
                "ip_address_id": $("#ip_address_id").val(),
                "filter": e.target.id,
                "lightCount_Id": $("#lightCount_Id").val()
            },
            success: function (result) {
                location.reload()
            }

        });


    }
})


$(document).ready(function () {
    $("#configDiv").css("display", "block")


    $("#configuration").on("click", function (e) {

    })

    $("#application").on("click", function () {

        $("#sidebar").css("margin-top", "-174")
        $("#applicationUlList").css("display", "block");
    })

});

$(document).ready(function () {


    function GetHistory() {
        $.ajax({
            type: "GET",
            url: "/ReadHistory/",
            success: function (result) {
                var html = ''
                $.each(result, function (index, value) {

                    html += '<div><label>Date: ' + value.datetime + ' </label> <label>Register:  ' + value.outPutValue + '</label> <label>Register:  ' + value.isOn + '</label></div>'


                })

                $("#lightHistory").html(html);
            }

        });

    }

    setInterval(GetHistory, 400000);
});

$(function () {
    // $('#lightHistory').marquee({
    //     duration: 5000,
    //      duplicated: true,
    //      gap: 00,
    //      direction: 'left',
    //      pauseOnHover: true
    // });
});


window.Apex = {
    chart: {
        foreColor: "#fff",
        toolbar: {
            show: false
        }
    },
    colors: ["#FCCF31", "#17ead9", "#f02fc2"],
    stroke: {
        width: 3
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: "#40475D"
    },
    xaxis: {
        axisTicks: {
            color: "#333"
        },
        axisBorder: {
            color: "#333"
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            gradientToColors: ["#F55555", "#6078ea", "#6094ea"]
        }
    },
    tooltip: {
        theme: "dark",
        x: {
            formatter: function (val) {
                return moment(new Date(val)).format("HH:mm:ss");
            }
        }
    },
    yaxis: {
        decimalsInFloat: 2,
        opposite: true,
        labels: {
            offsetX: -10
        }
    }
};

var trigoStrength = 3;
var iteration = 11;

function getRandom() {
    var i = iteration;
    return (
        (Math.sin(i / trigoStrength) * (i / trigoStrength) +
            i / trigoStrength +
            1) *
        (trigoStrength * 2)
    );
}

function getRangeRandom(yrange) {
    return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
}

function generateMinuteWiseTimeSeries1(baseval, count, yrange) {


    var values = [[
        4,3,10,9,29,19,25,9,12,7,19,5,13,9,17,2,7,5
      ], [
        2,3,8,7,22,16,23,7,11,5,12,5,10,4,15,2,6,2
      ]];
      var i = 0;
      var series = [];
      var x = new Date("11 Nov 2012").getTime();
      while (i < count) {
        series.push([x, values[baseval][i]]);
        x += 86400000;
        i++;
      }
      return series;


    // var i = 0;
    // var series = [];
    // while (i < count) {
    //     var x = baseval;
    //     var y =
    //         (Math.sin(i / trigoStrength) * (i / trigoStrength) +
    //             i / trigoStrength +
    //             1) *
    //         (trigoStrength * 2);
    //
    //     series.push([x, y]);
    //     baseval += 300000;
    //     i++;
    // }
    // return series;
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {



    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y =
            (Math.sin(i / trigoStrength) * (i / trigoStrength) +
                i / trigoStrength +
                1) *
            (trigoStrength * 2);

        series.push([x, y]);
        baseval += 300000;
        i++;
    }
    return series;
}

function getNewData(baseval, yrange) {
    var newTime = baseval + 300000;
    return {
        x: newTime,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    };
}

var optionsColumn = {
    chart: {
        height: 350,
        type: "bar",
        animations: {
            enabled: false
        },
        events: {
            animationEnd: function (chartCtx) {
                const newData = chartCtx.w.config.series[0].data.slice();
                newData.shift();
                window.setTimeout(function () {
                    chartCtx.updateOptions(
                        {
                            series: [
                                {
                                    data: newData
                                }
                            ],
                            xaxis: {
                                min: chartCtx.minX,
                                max: chartCtx.maxX
                            },
                            subtitle: {
                                text:
                                    parseInt(getRangeRandom({min: 1, max: 20})).toString() + "%"
                            }
                        },
                        false,
                        false
                    );
                }, 3000000);
            }
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 0
    },
    series: [
        {
            name: "Load Average",
            data:[{ x: '05/06/2014', y: 54 }, { x: '05/08/2014', y: 17 }]
            //     generateMinuteWiseTimeSeries1(
            // 0,
            //     18,
            //     {
            //         min: 10,
            //         max: 110
            //     }
            // )
        }
    ],
    title: {
        text: "Load Average",
        align: "left",
        style: {
            fontSize: "12px"
        }
    },
    subtitle: {
        text: "20%",
        floating: true,
        align: "right",
        offsetY: 0,
        style: {
            fontSize: "22px"
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100]
        }
    },
    // xaxis: {
    //     type: "datetime",
    //     // range: 2700000
    // },
    legend: {
        show: true
    }
};

var chartColumn = new ApexCharts(
    document.querySelector("#columnchart"),
    optionsColumn
);
chartColumn.render();

var optionsLine = {
    chart: {
        height: 350,
        type: "line",
        stacked: true,
        animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
                speed: 1000
            }
        },
        dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 5,
            left: -7,
            top: 22
        },
        events: {
            animationEnd: function (chartCtx) {
                const newData1 = chartCtx.w.config.series[0].data.slice();
                newData1.shift();
                const newData2 = chartCtx.w.config.series[1].data.slice();
                newData2.shift();
                window.setTimeout(function () {
                    chartCtx.updateOptions(
                        {
                            series: [
                                {
                                    data: newData1
                                },
                                {
                                    data: newData2
                                }
                            ],
                            subtitle: {
                                text: parseInt(getRandom() * Math.random()).toString()
                            }
                        },
                        false,
                        false
                    );
                }, 3000000);
            }
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: "straight",
        width: 5
    },
    grid: {
        padding: {
            left: 0,
            right: 0
        }
    },
    markers: {
        size: 0,
        hover: {
            size: 0
        }
    },
    series: [
        {
            name: "Running",
            data: generateMinuteWiseTimeSeries(
                new Date("12/12/2016 00:20:00").getTime(),
                12,
                {
                    min: 30,
                    max: 110
                }
            )
        },
        {
            name: "Waiting",
            data: generateMinuteWiseTimeSeries(
                new Date("12/12/2016 00:20:00").getTime(),
                12,
                {
                    min: 30,
                    max: 110
                }
            )
        }
    ],
    xaxis: {
        type: "datetime",
        range: 2700000
    },
    title: {
        text: "Processes",
        align: "left",
        style: {
            fontSize: "12px"
        }
    },
    subtitle: {
        text: "20",
        floating: true,
        align: "right",
        offsetY: 0,
        style: {
            fontSize: "22px"
        }
    },
    legend: {
        show: true,
        floating: true,
        horizontalAlign: "left",
        onItemClick: {
            toggleDataSeries: false
        },
        position: "top",
        offsetY: -33,
        offsetX: 60
    }
};

var chartLine = new ApexCharts(
    document.querySelector("#linechart"),
    optionsLine
);
chartLine.render();

var optionsCircle = {
    chart: {
        type: "radialBar",
        height: 250,
        offsetX: 0
    },
    plotOptions: {
        radialBar: {
            inverseOrder: false,
            hollow: {
                margin: 5,
                size: "48%",
                background: "transparent"
            },
            track: {
                show: true,
                background: "#40475D",
                strokeWidth: "10%",
                opacity: 1,
                margin: 3 // margin is in pixels
            }
        }
    },
    series: [71, 63],
    labels: ["Device 1", "Device 2"],
    legend: {
        show: true,
        position: "left",
        offsetX: -30,
        offsetY: -10,
        formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    }
};

var chartCircle = new ApexCharts(
    document.querySelector("#circlechart"),
    optionsCircle
);
chartCircle.render();

var optionsProgress1 = {
    chart: {
        height: 70,
        type: "bar",
        stacked: true,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: "20%",
            colors: {
                backgroundBarColors: ["#40475D"]
            }
        }
    },
    stroke: {
        width: 0
    },
    series: [
        {
            name: "Process 1",
            data: [44]
        }
    ],
    title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: "Process 1"
    },
    subtitle: {
        floating: true,
        align: "right",
        offsetY: 0,
        text: "44%",
        style: {
            fontSize: "20px"
        }
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        categories: ["Process 1"]
    },
    yaxis: {
        max: 100
    },
    fill: {
        opacity: 1
    }
};

var chartProgress1 = new ApexCharts(
    document.querySelector("#progress1"),
    optionsProgress1
);
chartProgress1.render();

var optionsProgress2 = {
    chart: {
        height: 70,
        type: "bar",
        stacked: true,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: "20%",
            colors: {
                backgroundBarColors: ["#40475D"]
            }
        }
    },
    colors: ["#17ead9"],
    stroke: {
        width: 0
    },
    series: [
        {
            name: "Process 2",
            data: [80]
        }
    ],
    title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: "Process 2"
    },
    subtitle: {
        floating: true,
        align: "right",
        offsetY: 0,
        text: "80%",
        style: {
            fontSize: "20px"
        }
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        categories: ["Process 2"]
    },
    yaxis: {
        max: 100
    },
    fill: {
        type: "gradient",
        gradient: {
            inverseColors: false,
            gradientToColors: ["#6078ea"]
        }
    }
};

var chartProgress2 = new ApexCharts(
    document.querySelector("#progress2"),
    optionsProgress2
);
chartProgress2.render();

var optionsProgress3 = {
    chart: {
        height: 70,
        type: "bar",
        stacked: true,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: "20%",
            colors: {
                backgroundBarColors: ["#40475D"]
            }
        }
    },
    colors: ["#f02fc2"],
    stroke: {
        width: 0
    },
    series: [
        {
            name: "Process 3",
            data: [74]
        }
    ],
    fill: {
        type: "gradient",
        gradient: {
            gradientToColors: ["#6094ea"]
        }
    },
    title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: "Process 3"
    },
    subtitle: {
        floating: true,
        align: "right",
        offsetY: 0,
        text: "74%",
        style: {
            fontSize: "20px"
        }
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        categories: ["Process 3"]
    },
    yaxis: {
        max: 100
    }
};

var chartProgress3 = new ApexCharts(
    document.querySelector("#progress3"),
    optionsProgress3
);
chartProgress3.render();

window.setInterval(function () {
    iteration++;

    chartColumn.updateSeries([
        {
            data: [
                ...chartColumn.w.config.series[0].data,
                [chartColumn.w.globals.maxX + 300000, getRandom()]
            ]
        }
    ]);

    chartLine.updateSeries([
        {
            data: [
                ...chartLine.w.config.series[0].data,
                [chartLine.w.globals.maxX + 300000, getRandom()]
            ]
        },
        {
            data: [
                ...chartLine.w.config.series[1].data,
                [chartLine.w.globals.maxX + 300000, getRandom()]
            ]
        }
    ]);

    chartCircle.updateSeries([
        getRangeRandom({min: 10, max: 100}),
        getRangeRandom({min: 10, max: 100})
    ]);

    var p1Data = getRangeRandom({min: 10, max: 100});
    chartProgress1.updateOptions({
        series: [
            {
                data: [p1Data]
            }
        ],
        subtitle: {
            text: p1Data + "%"
        }
    });

    var p2Data = getRangeRandom({min: 10, max: 100});
    chartProgress2.updateOptions({
        series: [
            {
                data: [p2Data]
            }
        ],
        subtitle: {
            text: p2Data + "%"
        }
    });

    var p3Data = getRangeRandom({min: 10, max: 100});
    chartProgress3.updateOptions({
        series: [
            {
                data: [p3Data]
            }
        ],
        subtitle: {
            text: p3Data + "%"
        }
    });
}, 3000000);


google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['voltage', 'Mhl'],
        ['current', 54.8],
        ['kva', 48.6],
        ['power', 44.4],
        ['meter', 23.9],
        ['energy', 14.5]
    ]);

    var options = {
        title: 'Energy Consuption',
        is3D: true
    };

    var chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

window.onload = function () {

    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Dynamic Data"
        },
        data: [{
            type: "line",
            dataPoints: dps
        }]
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 1000000;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function (count) {

        count = count || 1;

        for (var j = 0; j < count; j++) {
            yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }

        if (dps.length > dataLength) {
            dps.shift();
        }

        chart.render();
    };

    updateChart(dataLength);
    setInterval(function () {
        updateChart()
    }, updateInterval);

}
var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green", "blue", "orange", "brown"];





