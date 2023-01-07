window.onload = function()
{
  //--------------------------------------------START OF TABBING SECTION---------------------------------
  const triggerTabList = document.querySelectorAll('#listElements button')
  triggerTabList.forEach(triggerEl => {
  const tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', event => {
    event.preventDefault()
    tabTrigger.show()
    })
  });
//--------------------------------------------END OF TABBING SECTION---------------------------------


//--------------------------------------------START OF CANVAS TO PNG SAVING SECTION---------------------------------
// Code to make the save to png button do its thing
saveBtn=document.getElementById('btn-save');
saveBtn.addEventListener("click", function(e) {
  ctxBg.drawImage(img, currentX, currentY);
  ctxBg.font="30px Arial";
  ctxBg.fillText(tb.innerHTML,canvas.width/2,canvas.height/4);
  ctxBg.fillText("To: "+toName,3*canvas.width/4,3*canvas.height/4);
  ctxBg.fillText("From: "+fromName,3*canvas.width/4,0.85*canvas.height);
  var dataURL = canvasBg.toDataURL("image/png");
  downloadImage(dataURL, 'canvas.png');
  RefreshAfterDownload();
});

// Code to actually download the canvas
function downloadImage(data, filename) {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

function RefreshAfterDownload() {
  ctxBg.clearRect(0, 0,canvas.width,canvas.height);
  DrawBackground();
}
//--------------------------------------------END OF CANVAS TO PNG SAVING SECTION---------------------------------

//--------------------------------------------START OF BACKGROUND DRAW ON CANVAS SECTION---------------------------------

    var canvasBg=document.getElementById('canvas-bg');
    var ctxBg=canvasBg.getContext('2d');
    var imgBackground = new Image();
    const buttons = document.getElementsByTagName("button");

    const ButtonPressed = e => { 
      try{
        console.log(e.target.id);
        imgBackground.src=`./assets/${e.target.id}.png`;
        imgBackground.onload = function() {
          ProcessBackground();
        };
        console.log("Button is pressed");
      }
      catch (e) {
        console.log("Button without background is pressed");
      };
      

    }

    for (let btn of buttons) {
      btn.addEventListener("click", ButtonPressed);
  }

    function ProcessBackground(){
      DrawBackground();
    }
    function DrawBackground() {
      ctxBg.drawImage(imgBackground,0,0);
    };
//--------------------------------------------END OF BACKGROUND DRAW ON CANVAS SECTION---------------------------------
//--------------------------------------------START OF DRAG ACROSS CANVAS SECTION---------------------------------
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();

  var currentX = 0;
  var currentY = 0;
  
  currentX = canvas.width/2;
  currentY = canvas.height/2;
  
    //See which image was pressed
    const images = document.getElementsByTagName("img");

    const ImgPressed = e => { 
      console.log(e.target.id);
      img.src=`./assets/${e.target.id}.png`;
      img.onload = function() {
        ctx.clearRect(0, 0, img.width, img.height);
        ProcessBuddy();
      };
      console.log("Image is pressed");
    }

    for (let image of images) {
      image.addEventListener("click", ImgPressed);
  }
    
  var key,pos=0;
  function ProcessBuddy() {
    
    DrawImg();
    document.onkeydown=function(e)
    {
      pos=1;
      key=e.key;
    }
    document.onkeyup=function(e){pos=0;}
    setInterval(function()
    {
      if(pos==0)return;
      if(key=="ArrowLeft")currentX-=0.75;
      if(key=="ArrowUp")currentY-=0.75;
      if(key=="ArrowRight")currentX+=0.75;
      if(key=="ArrowDown")currentY+=0.75;
      ctx.drawImage(img,currentX,currentY);
    },1);
  }

  function DrawImg() {
    
    ctx.drawImage(img, currentX-(img.width/2), currentY-(img.height/2));
    ctx.globalCompositeOperation ='copy';
};
  
//--------------------------------------------END OF DRAG ON CANVAS SECTION---------------------------------
//--------------------------------------------START OF TO-FROM SECTION---------------------------------
var canvasToFr=document.getElementById("canvas-tofrom"); 
var ctxToFr=canvasToFr.getContext("2d"); 
var btnToFrom=document.getElementById("to-from-btn");
var toName;
var fromName;
ctxToFr.font="21px Arial";
ctxToFr.textAlign="left";
btnToFrom.addEventListener("click",function(e){
    ctxToFr.clearRect(0,0,canvasToFr.width,canvasToFr.height);
    toName=document.getElementById("to").value;
    fromName=document.getElementById("from").value;
    ctxToFr.fillText("To: "+toName,3*canvas.width/4,3*canvas.height/4);
    ctxToFr.fillText("From: "+fromName,3*canvas.width/4,0.85*canvas.height);
  });
//--------------------------------------------END OF TO-FROM SECTION---------------------------------

//--------------------------------------------START OF SPEECH RECOGNITION SECTION---------------------------------
    var SpeechRecognition=SpeechRecognition || webkitSpeechRecognition;
    let recognition=new SpeechRecognition();
    var tb=document.getElementById("message");

    recognition.lang="en-US";

    var canvasTxt=document.getElementById("canvas-text");
    var ctxTxt=canvasTxt.getContext("2d");
    ctxTxt.font="30px Arial";
    ctxTxt.textAlign="center";

    var buttonRec=document.getElementById("speak");
    buttonRec.addEventListener("click",function(){
        console.log("Speech recognition started");
        recognition.start();
    });

    recognition.onend=function(){
        console.log("Speech recognition ended");
        recognition.stop();
    };

    recognition.onresult=function(event){

        console.log(event);
        let result=event.results[0][0].transcript;
        tb.innerHTML=result; 
        ctxTxt.clearRect(0,0,canvasTxt.height,canvasTxt.width);
        ctxTxt.fillText(result,canvas.width/2,canvas.height/4);
    };
//--------------------------------------------END OF SPEECH RECOGNITION SECTION---------------------------------


};
    