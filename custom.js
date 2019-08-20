var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
w = ctx.canvas.width = 200;
h = ctx.canvas.height = w;

nt=0;yt=0;
config = {
  noiseSpeed: 0.018,
  ySpeed:     6,
  xScale:     30,
  yScale:     100,
  pixelSize:  5,
  gap:        0,
  color:      256,
  colorRange: 7,
  mode:       "de"
}

var gui = new dat.GUI(); gui.close();
setTimeout(function(){gui.open();}, 1000);
gui.add(config, "mode", {Default:"de",Firestream:"fs", Waves:"wa"});
gui.add(config, "color",         0,  360).step(1);
gui.add(config, "colorRange",    1,   20);
gui.add(config, "pixelSize",     2,   15).step(1);
gui.add(config, "gap",           0,   10).step(1);
gui.add(config, "noiseSpeed", 0.00, 0.15);
gui.add(config, "ySpeed",      0.0, 15.0);
gui.add(config, "xScale",       10,  100).step(1);
gui.add(config, "yScale",       10,  150).step(1);

//чтобы настройки открыть откомменть это
gui.hide();

function draw(){
  ctx.clearRect(0,0,w,h);
  nt+=config.noiseSpeed;
  yt+=config.ySpeed;
  for(var y=0; y<h; y+=config.pixelSize+config.gap){
    for(var x=0; x<w; x+=config.pixelSize+config.gap){
      if(config.mode == "fs"){
        var yn = noise.simplex3((y+yt)/config.yScale, x/config.xScale * (y/100), nt)*40+(y/(w/23));
      } else if(config.mode == "wa"){
        var yn = noise.simplex3((y+yt)/config.yScale-Math.sin(y/22)/10, x/config.xScale-Math.sin(y/23), nt)*20;
      } else{
        var yn = noise.simplex3((y+yt)/config.yScale, x/config.xScale, nt)*20+(y/(w/23));
      }
      var cn = lerp(y/10, yn*config.colorRange, 0.2);
      
      ctx.beginPath();
      ctx.fillStyle = "hsla("+(config.color+cn)+", 50%, 50%,"+(yn)+")";
      ctx.fillRect(x, y, config.pixelSize, config.pixelSize);
      ctx.closePath();
    }
  }
}

function lerp(x1, x2, n) {
  return (1 - n) * x1 + n * x2;
}
function render(){
  draw();
  requestAnimationFrame(render);
}render();



