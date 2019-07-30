var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var p = document.querySelector('p');
var num = 0;

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
	return 'rgb(' + 
			random(0, 255) + ',' +
			random(0, 255) + ',' +
			random(0, 255) + ')';
}

function Shape(x, y, velX, velY, exists) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
	Shape.call(this, x, y, velX, velY, exists);
	this.color = color;
	this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
}

Ball.prototype.update = function() {
	if ((this.x + this.size >= width) || (this.x - this.size <= 0)) {
		this.velX = -(this.velX);
	} else if ((this.y + this.size >= height) || (this.y - this.size <= 0)) {
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < allBall.length; j++) {
    if (!(this === allBall[j])) {
      var dx = this.x - allBall[j].x;
      var dy = this.y - allBall[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + allBall[j].size) {
        allBall[j].color = this.color = randomColor();
      }
    }
  }
}


function EvilCircle(x, y, velX, velY, exists) {
	Shape.call(this, x, y, 20, 20, exists);
	this.color = 'white';
	this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.stroke();
	window.onkeydown = e => {
    if (e.key === 'a') {
      this.x -= this.velX;
    } else if (e.key === 'd') {
      this.x += this.velX;
    } else if (e.key === 'w') {
      this.y -= this.velY;
    } else if (e.key === 's') {
      this.y += this.velY;
    }
  };
}

EvilCircle.prototype.checkBounds = function() {
	if ((this.x + this.size >= width) || (this.x - this.size <= 0)) {
		this.x -= this.size; 
	} else if ((this.y + this.size >= height) || (this.y - this.size <= 0)) {
		this.y -= this.size;
	}

}

EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < allBall.length; j++) {
      var dx = this.x - allBall[j].x;
      var dy = this.y - allBall[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + allBall[j].size) {
        	allBall[j].exists = false;
        	allBall[j].x = allBall[j].y = -1;
        	p.textContent = '还剩 ' + --num + ' 颗球';

      }
  }
}

var allBall = [];

	var evil = new EvilCircle(
		random(0, width),
		random(0, height),
		random(-3, 3),
		random(-3, 3),
		true,);

var allBall = [];
function loop() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
	ctx.fillRect(0, 0, width, height);

	while (allBall.length < 30) {
		var ball = new Ball(
			random(0, width),
			random(0, height),
			random(-7, 7),
			random(-7, 7),
			true,
			randomColor(),
			random(5, 20)
		);
		allBall.push(ball);
		num++;
	}
		p.textContent = '还剩 ' + num + ' 颗球';
	for (var i = 0; i < allBall.length; i++) {
		if (allBall[i].exists === true) {
			allBall[i].draw();
			allBall[i].update();
			allBall[i].collisionDetect();
		}
	}

	evil.draw();
	evil.checkBounds();
	evil.collisionDetect();

	requestAnimationFrame(loop);

}

loop();