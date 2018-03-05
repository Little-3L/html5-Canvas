var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;//设置比例，使时钟变大缩小时样式不变

function drawBackground() {
  ctx.save();
  ctx.translate(r, r);
  ctx.beginPath();
  ctx.lineWidth = 10 * rem;
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
  ctx.stroke();//绘制圆

  //时数
  var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  ctx.font = 18 * rem + "px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  //遍历12个点得到每个点的坐标，然后将数字放在相应位置
  hourNumbers.forEach(function (number, i) {
    var rad = 2 * Math.PI / 12 * i;
    var x = Math.cos(rad) * (r - 30 * rem);
    var y = Math.sin(rad) * (r - 30 * rem);
    ctx.fillText(number, x, y);
  });

  //秒数，遍历60个点
  for (var i = 0; i < 60; i++) {
    var rad = 2 * Math.PI / 60 * i;
    var x = Math.cos(rad) * (r - 18 * rem);
    var y = Math.sin(rad) * (r - 18 * rem);
    ctx.beginPath();//之前已经画过一次外圆，所以这次重新重置path

    //将是小时的点绘制成黑色，不是小时的点绘制成灰色
    if (i % 5 === 0) {
      ctx.fillStyle = "#000";
      ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
    } else {
      ctx.fillStyle = "#ccc";
      ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
    }
    ctx.fill();//填充圆
  }
}

//画出时针线
function drawHour(hour, minute) {
  ctx.save();//保存当前环境的状态
  ctx.beginPath();
  var rad = 2 * Math.PI / 12 * hour;
  var mrad = 2 * Math.PI / 12 / 60 * minute;
  ctx.rotate(rad + mrad);//rotate方法旋转角度，以弧度计
  ctx.lineWidth = 6 * rem;//设置线条粗细程度
  ctx.lineCap = "round";//设置线条样式
  ctx.moveTo(0, 10 * rem);//移动画线原点
  ctx.lineTo(0, -r / 2);//画出时针线，长度为半径的一半，往上为负
  ctx.stroke();
  ctx.restore();//返回之前保存过的路径状态和属性
}

//画出分针线
function drawMinute(minute) {
  ctx.save();
  ctx.beginPath();
  var rad = 2 * Math.PI / 60 * minute;
  ctx.rotate(rad);
  ctx.lineWidth = 3 * rem;
  ctx.lineCap = "round";
  ctx.moveTo(0, 10 * rem);
  ctx.lineTo(0, -r + 40 * rem);
  ctx.stroke();
  ctx.restore();
}

//画出秒针线
function drawSecond(second) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "#c14543";
  var rad = 2 * Math.PI / 60 * second;
  ctx.rotate(rad);
  //画出秒针样式，头细尾宽
  ctx.moveTo(-2 * rem, 20 * rem);
  ctx.lineTo(2 * rem, 20 * rem);//底部变宽
  ctx.lineTo(1, -r + 18 * rem);
  ctx.lineTo(-1, -r + 18 * rem);//头部变细
  ctx.fill();//填充由上述四点画出的线条内部
  ctx.restore();
}

//画出中心圆点
function drawDot(dot) {
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, width, height);//每秒清除Canvas
  //获取当前时间
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //画出时钟背景
  drawBackground();
  drawHour(hour, minute);
  drawMinute(minute);
  drawSecond(second);
  drawDot();
  ctx.restore();
}

draw();
setInterval(draw, 1000);