  // Get width, height of the column that the canvas will be drawn
  let canvas = $('#p5Canvas'); // Jquery selector
  var derawing = {};

  let sketch = function(p) {
    let frame=0;
    //let turtleimg=p.loadImage('turtle_1.png');
    let turtleStrokeWeight=2;
    p.setup = function() {
      const canvasWidth = canvas.width();
      const canvasHeight = canvas.height();
      drawing = p.createCanvas(canvasWidth, canvasHeight);
      drawing.parent("p5Canvas");
      p.strokeWeight(turtleStrokeWeight);
    };

    function myRelativePos(x1,y1,l,a) {
      let arad=a*Math.PI/180;
      let x2=x1+Math.cos(arad)*l;let y2=y1+Math.sin(arad)*l;
      return([x2,y2])
    }
    function myRelativeLine(x1,y1,l,a) {//draw a line at an angle (in degrees)
      let rpos=myRelativePos(x1,y1,l,a);
      p.line(x1,y1,rpos[0],rpos[1]);
      return(rpos);
    }
    function drawTurtle(x,y,a) {
      p.strokeWeight(4);
      let newpos=myRelativeLine(x,y,20,a);
      let xt=newpos[0];let yt=newpos[1];
      p.circle(xt,yt,40);//myRelativeLine(x,y,20,a);//overdrawn
      let rpos=myRelativePos(xt,yt,25,a+45);p.circle(rpos[0],rpos[1],10);
      rpos=myRelativePos(xt,yt,25,a+135);p.circle(rpos[0],rpos[1],10);
      rpos=myRelativePos(xt,yt,25,a+225);p.circle(rpos[0],rpos[1],10);
      rpos=myRelativePos(xt,yt,25,a+305);p.circle(rpos[0],rpos[1],10);
      newpos=myRelativeLine(xt,yt,25,a);
      xt=newpos[0];yt=newpos[1];
      p.circle(xt,yt,10);
      p.strokeWeight(turtleStrokeWeight);
    }
    p.draw = function() {
        /*
        Tüm canvas'ı siler. Sonra "stack"in içinde "frame"'e kadar olan şeyleri çizdirir.
        */
      p.background(255, 255, 255);
      //p.fill(255);
      console.log("Drawing frame:"+frame);
      let dangle=0.0;
      let danglerad=dangle*Math.PI/180;
      let x=drawing.width/2.0; let y=drawing.height/2.0;
      for (let i=0;i<frame;i++) {
        let current=stack[i];//console.log("current:",current);
        let cmove=current[0];let cval=0.0+current[1];
        if ((cmove=="move")||(cmove=="jump")) {
          danglerad=dangle*Math.PI/180;
          let xnext=x+Math.cos(danglerad)*cval;let ynext=y+Math.sin(danglerad)*cval;
          if (cmove=="move") 
            p.line(x,y,xnext,ynext);
          x=xnext;y=ynext;//console.log("degree, x,y:",dangle,x,y);
        } else if (cmove=="turn") {
          dangle+=cval;
        } 
      }
      frame++;
      if (frame>=stack.length) {
        frame=0;
        //if (!(document.getElementById("tekrarla").checked)) {
          console.log("Setting noloop");
          p.noLoop();
        //}
        return;
      } else {
        //let turtle= p.createSprite(x-56/2,y-64/2,56,64);
        //turtle.addImage(turtleimg);
        //p.drawSprites();
        //p.image(turtleimg,x-56/2,y-64/2);//adjust for the turtle midpoint
        drawTurtle(x,y,dangle);
      }
    };
  };

  var stack=[];
  var speed=5;
  function stackReset() {
    stack=[];
    speed=parseInt(document.getElementById("speed").value);
    console.log("Set speed to:",speed);
  }
  function stackup(movetype,moveval) {
    stack.push([movetype,moveval])
  }
  ileri=function(x) {
    for(let i=0;i<Math.floor(x/speed);i++) {stackup("move",speed);}
      if ((x % speed)!=0) stackup("move", x%speed);
  }
  atla=function(x) {
    for(let i=0;i<Math.floor(x/speed);i++) {stackup("jump",speed);}
      if ((x % speed)!=0) stackup("jump", x%speed);
  }
  sağa=function(x=90.0) {stackup("turn",x);}
  sola=function(x=90.0) {stackup("turn",-x);}
  function* saydır(n) {for(let i=1;i<=n;i++) {yield i;}}
  var myp;
  //run();

  function stop() {
    if (myp) {
      myp.remove();
      console.log("myp removed");
    }
  }
  function hackREPEAT(code) {
    console.log("hackREPEAT");
    let coderet="";
    let re = /\.*TEKRARLA.*/;
    for (line of code.split('\n')) {
      console.log("Line:",line);
      x=line.match(re);
      if (x!=null) {console.log("REPEATS:",x);}
      else {console.log("No match");}
    }
  }
  function run(){
      //console.log("Run");
      //var code2 = document.getElementsByName('code_2')[0].value;
      var code = document.getElementById('editor').value;
      var codeText =  code ;
      //hackREPEAT(codeText);
      if (myp) {
        myp.remove();
      }
      try {
        let myprog = new Function(codeText);
        stackReset();
        myprog();
        myp = new p5(sketch, "p5canvas");
      } catch(e) {
        alert(e);
      }
    }
    run();