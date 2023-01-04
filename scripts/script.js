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
  var dataURL = canvas.toDataURL("image/png");
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
      ctx.drawImage(imgBackground,currentX-(imgBackground.width/2),currentY-(imgBackground.height/2));
    };
//--------------------------------------------END OF BACKGROUND DRAW ON CANVAS SECTION---------------------------------
//--------------------------------------------START OF DRAG ACROSS CANVAS SECTION---------------------------------
  var canvas, ctx;
  var img = new Image();
  var imgBackground = new Image();
  var isDraggable = false;
  
  var currentX = 0;
  var currentY = 0;

  canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
  
    currentX = canvas.width/2;
    currentY = canvas.height/2;
  
    //See which image was pressed
    const images = document.getElementsByTagName("img");

    const ImgPressed = e => { 
      console.log(e.target.id);
      img.src=`./assets/${e.target.id}.png`;
      img.onload = function() {
        ProcessBuddy();
      };
      console.log("Image is pressed");
      console.log()
    }

    for (let image of images) {
      image.addEventListener("click", ImgPressed);
  }
    
  
  function ProcessBuddy() {
    MouseEvents();
  
    setInterval(function() {
      Refresh();
      DrawImg();
    }, 1000/30);
  }
  function Refresh() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0, canvas.width, canvas.height);
 
  }
  function MouseEvents() {
    canvas.onmousedown = function(e) {
  
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
  
  
      if (mouseX >= (currentX - img.width/2) &&
          mouseX <= (currentX + img.width/2) &&
          mouseY >= (currentY - img.height/2) &&
          mouseY <= (currentY + img.height/2)) {
        isDraggable = true;
      }
    };
    canvas.onmousemove = function(e) {
  
      if (isDraggable) {
        currentX = e.pageX - this.offsetLeft;
        currentY = e.pageY - this.offsetTop;
      }
    };
    canvas.onmouseup = function(e) {
      isDraggable = false;
    };
    canvas.onmouseout = function(e) {
      isDraggable = false;
    };
  }
  function DrawImg() {
    ctx.drawImage(img, currentX-(img.width/2), currentY-(img.height/2));
};
  
//--------------------------------------------END OF DRAG ON CANVAS SECTION---------------------------------

};
    
