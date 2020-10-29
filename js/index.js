(function () {
    var rem = 10;
    rem = 10 / 1440 * document.documentElement.clientWidth;
    document.documentElement.style.fontSize = rem + 'px';
})()

var myLine, myPie, myBar;
window.onload = function () {
    // 初始化echarts实例
    myLine = echarts.init(document.getElementById('myLine'));
    myPie = echarts.init(document.getElementById('myPie'));
    myBar = echarts.init(document.getElementById('myBar'));

    drawLine();
    drawPie();
    drawBar();

    // 绑定导航栏点击事件
    var text = Array.from(document.getElementsByClassName("text"))
    for (var i = 0; i < text.length; i++) {
        text[i].onclick = function () {
            for (var j = 0; j < text.length; j++) {
                text[j].className = ' border'
            }
            this.className = 'active'
        }
    }

    var slider = document.getElementsByClassName("slider")[0];
    var img = document.getElementsByTagName("img")[0];
    var li = document.getElementsByTagName("li");
    var left = document.getElementsByClassName("left")[0];
    var right = document.getElementsByClassName("right")[0];
    var num = 0;

    var timer = null;

    var arrUrl = ["../image/1.jpg", "../image/2.jpg", "../image/3.jpg", "../image/4.jpg", "../image/5.jpg"];

    left.onclick = function (ev) {
        num--;
        if (num == -1) {
            num = arrUrl.length - 1;
        }
        changeImg();
    };
    right.onclick = function (ev) {
        num++;
        if (num == arrUrl.length) {
            num = 0;
        }
        changeImg();
    };
    
    for (var i = 0; i < arrUrl.length; i++) {
        li[i].index = i;
        li[i].onclick = function (ev) {
            num = this.index;
            changeImg();
        }
    }
    setTimeout(autoPlay(), 1000); //延迟1秒执行自动切换
    //鼠标移入清除定时器，鼠标移出恢复
    img.onmouseover = function (ev) {
        console.log('ww')
        clearInterval(timer);
    };
    img.onmouseout = autoPlay;

    function changeImg() {
        img.src = arrUrl[num];
        for (var i = 0; i < li.length; i++) {
            li[i].className = "";
        }
        li[num].className = "activeDot";
    }

    function autoPlay() {
        timer = setInterval(function () {
            num++;
            num %= arrUrl.length;
            changeImg();
        }, 2000);
    }
}

function drawLine(data) {
    if (!data) {
        var url = 'https://edu.telking.com/api/?type=month';
        myAjax(url, drawLine);
        return;
    }

    // 配置参数
    var option = {
        legend: {
            data: ['']
        },
        tooltip: {},
        xAxis: {
            data: data['data']['xAxis'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        grid: {
            x: 50,
            y: 10,
            x2: 50,
            y2: 20
        },
        series: [{
            name: '人数',
            type: 'line',
            smooth: true,
            areaStyle: {
                normal: {
                    color: '#F3F6FD'
                }
            },
            itemStyle: {
                normal: {
                    color: '#98BDF7',
                    lineStyle: {
                        color: '#4E8DF0'
                    },
                    label: {
                        show: true
                    }
                }
            },
            data: data['data']['series']
        }]
    };

    // 画图
    myLine.setOption(option);
}

function drawPie(data) {
    if (!data) {
        var url = 'https://edu.telking.com/api/?type=week';
        myAjax(url, drawPie);
        return;
    }

    var option = {
        legend: {
            data: ['']
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '人数',
            type: 'pie',
            labelLine: {
                normal: {
                    length: 5
                }
            },
            label: {
                normal: {
                    formatter: '{b}',
                }
            },
            radius: '90%',
            data: arrayTool(data['data']['xAxis'], data['data']['series'])
        }]
    };

    myPie.setOption(option);
}

function drawBar(data) {
    if (!data) {
        var url = 'https://edu.telking.com/api/?type=week';
        myAjax(url, drawBar);
        return;
    }

    var option = {
        legend: {
            data: ['']
        },
        tooltip: {},
        xAxis: {
            data: data['data']['xAxis'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: [{
            type: 'value',
            scale: true,
            name: '商品数',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        grid: {
            x: 50,
            y: 40,
            x2: 50,
            y2: 20
        },
        series: [{
            name: '人数',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
                color: 'rgba(64, 126, 223,1)'
            },
            data: data['data']['series']
        }]
    };

    myBar.setOption(option);
}

// 封装ajax
function myAjax(url, fn) {

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var data = JSON.parse(xmlHttp.responseText);
            fn.call(this, data);
        }
    }

    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function arrayTool(name, value) {
    var arr = []
    for (var i = 0; i < name.length; i++) {
        var obj = {};
        obj.name = name[i];
        obj.value = value[i];
        arr.push(obj);
    }
    return arr;
}

function myClick() {
    console.log('why')
    alert('whys')
}