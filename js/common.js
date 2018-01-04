document.addEventListener("DOMContentLoaded", ready);
function ready() {

	var c = 0; //счетчик попаданий
	var z = 0; //счетчик выстрелов
// консоль текст перед началом игры
	var start = document.querySelector('div#start');
	var consolSecond = document.querySelector('div.consolSecond');
	var consolThird = document.querySelector('div.consolThird');
	var end = document.querySelector('div.end');
	var result = document.querySelector('div.result');
	var endFirstGame = document.querySelector('div.endFirstGame');
	var name;
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'mp3/start.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем

	var ok = document.querySelector('button.ok');
	ok.addEventListener('click',function() {
		name = document.getElementById('name').value;
		if(name != '' || name != ' '){
			var nameMy = document.querySelectorAll('span.nameMy');
			for(var i = 0; i < nameMy.length; i++){
				nameMy[i].textContent = name;
			}
			consolSecond.style.display = 'none';
			consolThird.style.display = 'block';
		}
	},false);

	var ready = document.querySelector('button.ready');
	ready.addEventListener('click',function() {
		consolThird.style.display = 'none';
		start.style.display = 'none';
		startGame();
	},false);
	var ready2 = document.querySelector('button.ready2');
	ready2.addEventListener('click',function() {
		endFirstGame.style.display = 'none';
		start.style.display = 'none';
		c = 0;
		z = 0;
		game = true;
		startGame();
	},false);

// логика игры (начало)
	var game = true;
	function startGame() {
		if(!game) return false;

		pressedKey();
		var keyCannon = false;
		var attacks = document.getElementById('attacks');// Подсчет попаданий
		attacks.textContent = c;
		var quantity = document.querySelector('span.quantity');
		var quantityShots = document.querySelector('span.quantityShots');
		var body = document.querySelector('body');
		var ball = document.getElementById('ball');
		var hit = false;

		ball.style.cssText = "transition:ballFlies2 30s ease-in 0s infinite;-webkit-animation:ballFlies2 30s ease-in 0s infinite;-moz-animation:ballFlies2 30s ease-in 0s infinite;-ms-animation:ballFlies2 30s ease-in 0s infinite;-o-animation:ballFlies2 30s ease-in 0s infinite;top: 1%; left: 1%;";
		var cannon = document.querySelectorAll('div.cannon');
		for(var i = 0; i < cannon.length; i++){
			cannon[i].style.cssText = "transition:none;-webkit-animation:none;-moz-animation:none;-ms-animation:none;-o-animation:none;";
		}

	// проверка попадания
		function hitTest(bullet,checkCoincidence) {
			var ballCoordinatTop = ball.getBoundingClientRect().top;
			var ballCoordinatBottom = ballCoordinatTop + 30;
			var ballCoordinatLeft = ball.getBoundingClientRect().left;
			var ballCoordinatRight = ballCoordinatLeft + 60;
			bulletCoordinatTop = bullet.getBoundingClientRect().top;
			bulletCoordinatLeft = bullet.getBoundingClientRect().left;

			if(bulletCoordinatTop >= ballCoordinatTop && bulletCoordinatTop <= ballCoordinatBottom && ballCoordinatLeft <= bulletCoordinatLeft && ballCoordinatRight >= bulletCoordinatLeft){
				var audio = new Audio(); // Создаём новый элемент Audio
				audio.src = 'mp3/burst.mp3'; // Указываем путь к звуку "клика"
				audio.autoplay = true; // Автоматически запускаем
				c = c + 1;
				attacks.textContent = c;
				quantity.textContent = c;
				hit = true;
				body.removeChild(bullet);

				ball.style.cssText = "background:url(img/boom.png)no-repeat;transition:none;-webkit-animation:none;-moz-animation:none;-ms-animation:none;-o-animation:none;top: "+ballCoordinatTop+"px; left: "+ballCoordinatLeft+"px;";
			// изменение траектории и скорости 
				setTimeout(function() {
					if(c < 2){
						ball.style.cssText = "top: 1%; left: 1%;";
					}
					if(c >= 2 && c < 4){
						ball.style.cssText = "transition:ballFlies2 25s ease-in 0s infinite;-webkit-animation:ballFlies2 25s ease-in 0s infinite;-moz-animation:ballFlies2 25s ease-in 0s infinite;-ms-animation:ballFlies2 25s ease-in 0s infinite;-o-animation:ballFlies2 25s ease-in 0s infinite;top: 10%; left: 50%;";
					}
					if( c >= 4){
						ball.style.cssText = "transition:ballFlies 20s ease-in 0s infinite;-webkit-animation:ballFlies 20s ease-in 0s infinite;-moz-animation:ballFlies 20s ease-in 0s infinite;-ms-animation:ballFlies 20s ease-in 0s infinite;-o-animation:ballFlies 20s ease-in 0s infinite;top: 30%; left: 94%;";
					}
					if( c >= 6){
						var cannon = document.querySelectorAll('div.cannon');
						for(var i = 0; i < cannon.length; i++){
							cannon[i].style.cssText = "transition:cannon 4s ease-in 0s infinite;-webkit-animation:cannon 4s ease-in 0s infinite;-moz-animation:cannon 4s ease-in 0s infinite;-ms-animation:cannon 4s ease-in 0s infinite;-o-animation:cannon 4s ease-in 0s infinite;";
						}
						ball.style.cssText = "transition:ballFlies2 20s ease-in 0s infinite;-webkit-animation:ballFlies2 20s ease-in 0s infinite;-moz-animation:ballFlies2 20s ease-in 0s infinite;-ms-animation:ballFlies2 20s ease-in 0s infinite;-o-animation:ballFlies2 20s ease-in 0s infinite;top: 10%; left: 44%;";
					}
					if( c >= 8){
						var cannon = document.querySelectorAll('div.cannon');
						for(var i = 0; i < cannon.length; i++){
							cannon[i].style.cssText = "transition:cannon 2s ease-in 0s infinite;-webkit-animation:cannon 2s ease-in 0s infinite;-moz-animation:cannon 2s ease-in 0s infinite;-ms-animation:cannon 2s ease-in 0s infinite;-o-animation:cannon 2s ease-in 0s infinite;";
						}
						ball.style.cssText = "transition:ballFlies 20s ease-in 0s infinite;-webkit-animation:ballFlies 20s ease-in 0s infinite;-moz-animation:ballFlies 20s ease-in 0s infinite;-ms-animation:ballFlies 20s ease-in 0s infinite;-o-animation:ballFlies 20s ease-in 0s infinite;top: 2%; left: 74%;";
					}
					if( c >= 10){
						ball.style.cssText = "transition:ballFlies2 10s ease-in 0s infinite;-webkit-animation:ballFlies2 10s ease-in 0s infinite;-moz-animation:ballFlies2 10s ease-in 0s infinite;-ms-animation:ballFlies2 10s ease-in 0s infinite;-o-animation:ballFlies2 10s ease-in 0s infinite;top: 2%; left: 74%;";
					}
					if( c >= 12){
						var cannon = document.querySelectorAll('div.cannon');
						for(var i = 0; i < cannon.length; i=i+1){
							cannon[i].style.cssText = "transition:cannon2 4s ease-in 0s infinite;-webkit-animation:cannon2 4s ease-in 0s infinite;-moz-animation:cannon2 4s ease-in 0s infinite;-ms-animation:cannon2 4s ease-in 0s infinite;-o-animation:cannon2 4s ease-in 0s infinite;";
						}
						ball.style.cssText = "transition:ballFlies 10s ease-in 0s infinite;-webkit-animation:ballFlies 10s ease-in 0s infinite;-moz-animation:ballFlies 10s ease-in 0s infinite;-ms-animation:ballFlies 10s ease-in 0s infinite;-o-animation:ballFlies 10s ease-in 0s infinite;top: 2%; left: 74%;";
					}
				},200)
				clearInterval(checkCoincidence);
				return;
			}
		}
	// нет попадания
		function noHit(bullet,hit) {
			if(!hit){
				body.removeChild(bullet);
			}
			return;
		}
		function bulletFlight(bullet,bulletTopVetting,checkCoincidence,itemCannon) {
			var	bulletCoordinatTop = bullet.getBoundingClientRect().top;
			if(bulletCoordinatTop <= 0){
				clearInterval(bulletTopVetting);
				clearInterval(checkCoincidence);
			}
			return;
		}
	// выстрел
		function shot(itemCannon) {
			if(!game) return false;
			var audio = new Audio(); // Создаём новый элемент Audio
			audio.src = 'mp3/shot.mp3'; // Указываем путь к звуку "клика"
			audio.autoplay = true; // Автоматически запускаем

			z = z + 1;
			quantityShots.textContent = z;
			hit = false;
		// движение пушки при выстреле
			itemCannon.style.bottom = '-10px';
			setTimeout(function() {itemCannon.style.bottom = '0px';},200);
		// координаты пушки
			var itemCannonTop = itemCannon.getBoundingClientRect().top;
			var itemCannonLeft = itemCannon.getBoundingClientRect().left;
		// создаем пулю
			var bullet = document.createElement('span');
			bullet.className = 'bullet';
			body.appendChild(bullet);
		// координаты пули
			bullet.style.cssText = "top:"+itemCannonTop+"px; left: "+itemCannonLeft+"px;";

			var checkCoincidence = setInterval(function() {
				hitTest(bullet,checkCoincidence);
			},4);
			setTimeout(function() {
				clearInterval(checkCoincidence);
			},500);
			var checkNoHit = setTimeout(function() {
				noHit(bullet,hit);
			},505);
			setTimeout(function() {
				pressedKey();
			},400);
			var bulletTopVetting = setInterval(function() {
				bulletFlight(bullet,bulletTopVetting,checkCoincidence,itemCannon);
			},100);
			return;
		}
	//Таймер
		var time = document.getElementById('time');
		var t = 60;
		time.textContent = t;
		function timeCountdown() {
			t = t - 1;
			time.textContent = t;
			if(t <= 0){
				clearInterval(timeCountdownInterval);
				start.style.display = 'block';
				endFirstGame.style.display = 'block';
				game = false;
				return;
			}
		}
		var timeCountdownInterval = setInterval(function() {
			timeCountdown();
		},1000);

		// нажатие кнопок клавиатуры
		function pressedKey() {
			window.addEventListener('keydown',function(element) {
				if( element.keyCode === 81){
					var itemCannon = cannon[0];
					this.removeEventListener('keydown', arguments.callee, false);
					shot(itemCannon);
				}
				if( element.keyCode === 87){
					var itemCannon = cannon[1];
					this.removeEventListener('keydown', arguments.callee, false);
					shot(itemCannon);
				}
				if( element.keyCode === 69){
					var itemCannon = cannon[2];
					this.removeEventListener('keydown', arguments.callee, false);
					shot(itemCannon);
				}
				if( element.keyCode === 82){
					var itemCannon = cannon[3];
					this.removeEventListener('keydown', arguments.callee, false);
					shot(itemCannon);
				}
				if( element.keyCode === 84){
					var itemCannon = cannon[4];
					this.removeEventListener('keydown', arguments.callee, false);
					shot(itemCannon);
				}
				if( element.keyCode === 89){
					var itemCannon = cannon[5];
					this.removeEventListener('keydown', arguments.callee, false);
					shot(itemCannon);
				}
			},false);
		}

	}
// логика игры (конец)

}