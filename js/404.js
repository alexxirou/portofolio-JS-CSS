(function(options) {
  let canvas = document.createElement("canvas");
  canvas.width = options.width;
  canvas.height = options.height;
  canvas.style.width = options.width / 2 + "px";
  canvas.style.height = options.height / 2 + "px";
  canvas.id = "notFound";
  document.getElementById("animation-container").appendChild(canvas);

  let ctx = canvas.getContext("2d");
  let imageData = false;
  let particles = [];

  function init() {
    positionParticles();
    positionText();
  }

  function positionParticles() {
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = 500;
    tempCanvas.height = 350;
    let context = tempCanvas.getContext("2d");
    context.fillStyle = "#000000";
    context.font = "300px 'Arial', sans-serif";
    context.fillText(options.keyword, 0, 250);

    let imageData = context.getImageData(0, 0, 350, 500);
    let data = imageData.data;

    // Iterate each row and column
    for (let i = 0; i < imageData.height; i += options.density) {
      for (let j = 0; j < imageData.width; j += options.density) {
        // Get the color of the pixel
        let color = data[((j * imageData.width * 4) + i * 4) - 1];

        // If the color is black, draw particles
        if (color === 255) {
          let newPar = particle();
          newPar.setPosition(i, j);
          particles.push(newPar);
        }
      }
    }
  }

  function positionText() {
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = 500;
    tempCanvas.height = 150;
    let context = tempCanvas.getContext("2d");
    context.fillStyle = "#000000";
    context.font = "70px 'Arial', sans-serif";
    context.fillText("Profile photo", -8, 50);
    context.fillText("not found", 30, 130);

    let imageData = context.getImageData(0, 0, 400, 400);
    let data = imageData.data;

    // Iterate each row and column
    for (let i = 0; i < imageData.height; i += options.densityText) {
      for (let j = 0; j < imageData.width; j += options.densityText) {
        // Get the color of the pixel
        let color = data[((j * imageData.width * 4) + i * 4) - 1];

        // If the color is black, draw particles
        if (color === 255) {
          let newPar = particle(true);
          newPar.setPosition(i, j);
          particles.push(newPar);
        }
      }
    }
  }

  function particle(text) {
    let particle = {
      x: 0,
      y: 0,
      radius: 0,
      size: 0,
      timer: 0,
      v: 0,
      vy: 0,
      a: 0,
      free: false,
      text: false,
      update: function(x, y) {
        if (this.timer < 100) {
          this.timer++;
        } else {
          if (this.free === false) {
            this.x = Math.cos(this.a * Math.PI / 180) * this.v + this.position.x;
            this.y = Math.sin(this.a * Math.PI / 180) * this.vy + this.position.y + this.timer;

            this.vy += 0.1;
            this.a += Math2.random() * 2;

            if (this.y > options.height + this.height) {
              this.free = true;
            }
          } else {
            this.x = Math.cos(this.a * Math.PI / 180) * this.v + this.position.x;
            this.y = Math.sin(this.a * Math.PI / 180) * this.v + this.position.y - this.timer;

            this.vy -= 0.1;
            this.a += Math2.random() * 2;

            if (this.y < -this.height) {
              this.free = false;
            }
          }
        }
      },
      setPosition: function(x, y) {
        if (this.text) {
          this.x = x + (options.width / 2 - 180);
          this.y = y + (options.height / 2 + 100);
        } else {
          this.x = x + (options.width / 2 - 250);
          this.y = y + (options.height / 2 - 175);
        }
      },
    };

    particle.text = text || false;
    particle.radius = particle.text ? Math.random() * 3.5 : Math.random() * 10.5;
    particle.size = particle.radius;
    particle.position = { x: -particle.radius, y: -particle.radius };
    particle.free = false;
    particle.timer = Math2.randomInt(0, 100);
    particle.v = Math2.randomPlusMinus() * Math2.random(0.5, 1);
    particle.hovered = false;

    return particle;
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      if (mousePos.x > p.x && mousePos.x < p.x + p.size && mousePos.y > p.y && mousePos.y < p.y + p.size) {
        p.hovered = true;
      }

      p.scale = Math.max(Math.min(2.5 - (Math2.distance(p.x, p.y, mousePos.x, mousePos.y) / 160), 160), 1);

      p.x = p.x + 0.2 * Math.sin(p.timer * 0.15);
      p.y = p.y + 0.2 * Math.cos(p.timer * 0.15);
      p.timer = p.timer + p.v;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.closePath();
    }

    requestAnimationFrame(update);
  }

  window.onresize = function() {
    options.width = window.innerWidth;
    options.height = window.innerHeight;
    canvas.width = options.width;
    canvas.height = options.height;
    canvas.style.width = options.width / 2 + "px";
    canvas.style.height = options.height / 2 + "px";
  };

  window.onmousemove = function(e) {
    e = e || window.event;

    let pageX = e.pageX;
    let pageY = e.pageY;
    if (pageX === undefined) {
      pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    mousePos.x = pageX;
    mousePos.y = pageY;
  };

  let mousePos = {
    x: -1,
    y: -1,
  };

  let Math2 = {
    distance: function(x1, y1, x2, y2) {
      let dx = x1 - x2;
      let dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    },
    random: function(min, max) {
      return min + Math.random() * (max - min);
    },
    randomInt: function(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    randomPlusMinus: function() {
      return Math.random() < 0.5 ? -1 : 1;
    },
  };

  init();
  update();
})({
  width: window.innerWidth,
  height: window.innerHeight,
  keyword: "404",
  density: 10,
  densityText: 3,
  minDist: 20,
});
