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
  var dataURL = canvasBg.toDataURL("image/png");
  downloadImage(dataURL, 'canvas.png');
});

// Code to actually download the canvas
function downloadImage(data, filename) {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}
//--------------------------------------------END OF CANVAS TO PNG SAVING SECTION---------------------------------

//--------------------------------------------START OF BACKGROUND DRAW ON CANVAS SECTION---------------------------------

    var canvasBg=document.getElementById('canvas-bg');
    var ctxBg=canvasBg.getContext('2d');
    var imgBackground = new Image();
    const buttons = document.getElementsByTagName("button");

    const ButtonPressed = e => { 
      console.log(e.target.id);
      imgBackground.src=`./assets/${e.target.id}.png`;
      imgBackground.onload = function() {
        ProcessBackground();
      };
      console.log("Button is pressed");

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

};
    