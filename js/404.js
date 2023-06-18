// Animation frame polyfill
(function () {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame =
      window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();

// Math2 utils
var Math2 = {};
Math2.random = function (t, n) {
  return Math.random() * (n - t) + t;
};
Math2.map = function (t, n, r, a, o) {
  return ((o - a) * (t - n)) / (r - n) + a;
};
Math2.randomPlusMinus = function (t) {
  return t = t ? t : 0.5, Math.random() > t ? -1 : 1;
};
Math2.randomInt = function (t, n) {
  return Math.floor(Math.random() * (n - t + 1)) + t;
};
Math2.randomBool = function (t) {
  return t = t ? t : 0.5, Math.random() < t;
};
Math2.degToRad = function (t) {
  return (rad = (t * Math.PI) / 180), rad;
};
Math2.radToDeg = function (t) {
  return (deg = (180 / (Math.PI * t))), deg;
};
Math2.rgbToHex = function (t) {
  function n(t) {
    return ("0" + parseInt(t).toString(16)).slice(-2);
  }
  t = t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  var r = n(t[1]) + n(t[2]) + n(t[3]);
  return r.toUpperCase();
};
Math2.distance = function (t, n, r, a) {
  return Math.sqrt((r - t) * (r - t) + (a - n) * (a - n));
};

// Mouse
var mousePos = {
  x: 0,
  y: 0,
};
window.onmousemove = function (e) {
  e = e || window.event;
  var pageX = e.pageX;
  var pageY = e.pageY;
  if (pageX === undefined) {
    pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  mousePos.x = pageX;
  mousePos.y = pageY;
};

// Animation options
var options = {
  width: window.innerWidth,
  height: window.innerHeight,
  keyword: 'ABOUT',
  density: 200,
  minDist: 50,
};

// Create the PIXI application
var app = new PIXI.Application({
  width: options.width,
  height: options.height,
  antialias: true,
  transparent: true,
});
document.getElementById("animation-container").appendChild(app.view);

// Create a container for the text
var textContainer = new PIXI.Container();
app.stage.addChild(textContainer);

// Create a container for the particles
var particlesContainer = new PIXI.Container();
app.stage.addChild(particlesContainer);

// Load the font
WebFont.load({
  google: {
    families: ['Roboto'],
  },
  active: function () {
    init();
    animate();
  },
});

function init() {
  // Create the text
  var text = new PIXI.Text(options.keyword, {
    fontFamily: 'Roboto',
    fontSize: 300,
    fill: 0xffffff,
    fontWeight: 'bold',
    align: 'center',
  });
  text.anchor.set(0.5);
  text.position.set(options.width / 2, options.height / 2);
  textContainer.addChild(text);

  // Create the particles
  var texture = PIXI.Texture.from('https://i.imgur.com/Im4JXG5.png');
  for (var i = 0; i < options.density; i++) {
    var particle = new PIXI.Sprite(texture);
    particle.position.set(Math.random() * options.width, Math.random() * options.height);
    particle.anchor.set(0.5);
    particlesContainer.addChild(particle);
  }
}

function animate() {
  // Update particle positions based on mouse movement
  var mouseDist = Math2.distance(options.width / 2, options.height / 2, mousePos.x, mousePos.y);
  particlesContainer.children.forEach(function (particle) {
    var dist = Math2.distance(particle.x, particle.y, mousePos.x, mousePos.y);
    var scale = Math.max(0, 1 - dist / (options.minDist + mouseDist));
    particle.scale.set(scale);
  });

  // Update text colors based on mouse movement
  textContainer.children.forEach(function (text) {
    var dist = Math2.distance(text.x, text.y, mousePos.x, mousePos.y);
    var scale = Math.max(0, 1 - dist / (options.minDist + mouseDist));
    var colorHex = Math2.rgbToHex('rgb(' + Math.floor(255 * scale) + ',' + Math.floor(255 * scale) + ',' + Math.floor(255 * scale) + ')');
    text.style.fill = colorHex;
  });

  // Render the stage
  app.renderer.render(app.stage);

  // Call animate again on the next frame
  requestAnimationFrame(animate);
}
