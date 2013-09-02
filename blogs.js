var plusgained = 0;
var allTimeplus = 0;
var multiplier = 1;
var currentпвс = 0;
var displayString = "Плюсов";

var tickIntervalID;
var saveIntervalID;

var products = [
    {objID: "cheerreview",    displayName: "Похвалить новый обзор",      counter: 0,   price: 50,      multiplier: 0,    пвс: 1  },
    {objID: "postfunnypic",       displayName: "Запостить смешных картиночек в комментариях под обзором",                   counter: 0,   price: 300,     multiplier: 1,    пвс: 2  },
    {objID: "postpasta",      displayName: "Запостить пасту в блогах",                 counter: 0,   price: 600,     multiplier: 2,    пвс: 3  },
    {objID: "review", displayName: "Обзор на пять предложений", counter: 0,   price: 2000,    multiplier: 3,    пвс: 4  },
    {objID: "showdes", displayName: "Тема покажи свой рабочий стол",            counter: 0,   price: 4000,    multiplier: 4,    пвс: 5  },
    {objID: "umad",        displayName: "Сеть твинков",                   counter: 0,   price: 7500,    multiplier: 5,    пвс: 7 },
    {objID: "redbull",  displayName: "Рэдбул. Кого - то он окрыляет, а тебе он поможет меньше спать.",       counter: 0,   price: 10000,   multiplier: 6,    пвс: 9 },
    {objID: "codebybydlocoder",       displayName: "Пройтись по истории - накопать интересностей, и слепить в один пост под общим соусом.",                   counter: 0,   price: 20000,   multiplier: 8,   пвс: 12 },
    {objID: "callStig",  displayName: "Позвонить Стигу",             counter: 0,   price: 50000,   multiplier: 10,   пвс: 14 },
    {objID: "perestanchitatkodnarkoman",          displayName: "Ты настолько хорош, что можешь просить о плюсах даже авторский состав. И они всегда отвечают.",                counter: 0,   price: 200000,  multiplier: 12,   пвс: 18 },
    {objID: "timeplusmachine",            displayName: "Машина времени. Получи свои плюсы до того, как они были поставлены.",               counter: 0,   price: 350000,  multiplier: 18,   пвс: 25 }
];

var consumables = [
    {objID: "adanm",                 displayName: "All day all night mode",                           owned: false, price: 500000,  multiplier: 60,   пвс: 60,  effectText: "???"         },
    {objID: "modmode",                 displayName: "Режим модератора",                           owned: false, price: 1000000, multiplier: 120,  пвс: 120, effectText: "???"         },
    {objID: "fluttershyisbestponi",             displayName: "Укради игру, перепиши пару строк, и огребай плюсы.",           owned: false, price: 1500000, multiplier: 200,  пвс: 0,   effectText: "+200пвс"      },
    {objID: "dunnolol",      displayName: "Знание HTML - это магия.",                  owned: false, price: 2000000, multiplier: 0,    пвс: 0,   effectText: "Умножает пвс" },
    {objID: "leagueofplusers",    displayName: "Возродить лигу плюсов",              owned: false, price: 3000000, multiplier: 0,    пвс: 0,   effectText: "Я слышал ты любишь множители"  }
  
];

function saveGame() {
	$.cookie("DSplusgained",   plusgained,                 {expires: 365} );
	$.cookie("DSAllTime",       allTimeplus,          {expires: 365} );
	$.cookie("DSMultiplier",    multiplier,                  {expires: 365} );
	$.cookie("DSCurrentпвс",    currentпвс,                  {expires: 365} );
	$.cookie("DSDisplayString", displayString,               {expires: 365} );
	$.cookie("DSProducts",      JSON.stringify(products),    {expires: 365} );
	$.cookie("DSConsumables",   JSON.stringify(consumables), {expires: 365} );
	
	$('#saveStatus').fadeIn(2000, function() { $('#saveStatus').fadeOut(2000); });
}

function loadGame() {
	if($.cookie("DSplusgained") != null) {
		plusgained =        new Number($.cookie("DSplusgained"));
		allTimeplus = new Number($.cookie("DSAllTime"));
		multiplier =         new Number($.cookie("DSMultiplier"));
		currentпвс =         new Number($.cookie("DSCurrentпвс"));
		displayString =      $.cookie("DSDisplayString");
		loadedProducts =     $.parseJSON($.cookie("DSProducts"));
		loadedConsumables =  $.parseJSON($.cookie("DSConsumables"));

		// Copy counters and prices to global array
		for(l = 0; l < products.length; l++) {
			for(m = 0; m < loadedProducts.length; m++) {
				if(loadedProducts[m].objID == products[l].objID) {
					products[l].counter = loadedProducts[m].counter;
					products[l].price = loadedProducts[m].price;
					break;
				}
			}
		}
		
		for(n = 0; n < consumables.length; n++) {
			for(o = 0; o < loadedConsumables.length; o++) {
				if(loadedConsumables[o].objID == consumables[n].objID) {
					consumables[n].owned = loadedConsumables[o].owned;
					break;
				}
			}
		}
		
		// Recreate grafix
		for(i = 0; i < products.length; i++) {
			if(products[i].counter > 0) {
				for(j = 0; j < products[i].counter; j++) {
					createGrafix(products[i].objID);
				}
			}
		}
		
		for(k = 0; k < consumables.length; k++) {
			if(consumables[k].owned == true) {
				var newGrafix = document.createElement("img")
				var randTop = Math.floor(Math.random()*101);
				var randLeft = Math.floor(Math.random()*101);
				var flavorText = consumables[k].displayName;
				newGrafix.className = "grafix";
				newGrafix.setAttribute("style", "top: " + randTop + "%; left: " + randLeft + "%;");
				newGrafix.setAttribute("alt", flavorText);
				newGrafix.setAttribute("title", flavorText);
				newGrafix.src = "./i/" + consumables[k].objID + ".png";
				
				if(consumables[k].objID == "adanm" || consumables[k].objID == "modmode") {
					document.body.style.backgroundImage = "url('./i/" + consumables[k].objID + "Background.png')";
				}
				
				document.getElementById("grafixContainer").appendChild(newGrafix);
				document.getElementById(consumables[k].objID + "Button").setAttribute("class","hidden");
			}
		}
		
		updateDisplay();
	}
}

function resetGame() {
	if(confirm('Are you sure you want to clear your saved data and start over?')) { 
		window.clearInterval(tickIntervalID);
		window.clearInterval(saveIntervalID);
		
		var cookies = document.cookie.split(";");
		for(var i = 0; i < cookies.length; i++) {
			var equals = cookies[i].indexOf("=");
			var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
		
		location.reload();
	}
}

function main() {
	for(x = 0; x < products.length; x++) {
		createButton(products[x], false);
	}
	
	for(y = 0; y < consumables.length; y++) {
		createButton(consumables[y], true);
	}
	
	var suckDickButton = document.createElement("button");
	suckDickButton.setAttribute("id", "suckDickButton");
	suckDickButton.onmousedown = function () { suckDick(); };
	suckDickButton.innerHTML = " Написать на главной ";
	document.getElementById("plusButtonContainer").appendChild(suckDickButton);
	
	tickIntervalID = window.setInterval(tick, 1000);
	window.onresize = function() { scaleDivs(); };
	scaleDivs();
	
	loadGame();
	saveIntervalID = window.setInterval(saveGame, 30000);
}

function scaleDivs() {
	document.getElementById("shopContainer").style.height = (window.innerHeight - 15) + "px";
	document.getElementById("grafixContainer").style.height = (window.innerHeight - 90) + "px"; 
	// ^ 
	// Some images may overflow the div and cause scroll bars to appear 
	// and we don't want that, so leave some room at the bottom.
	//
	// The tallest image is 89px at the moment so an extra 90px should 
	// cover it if it appears at the very bottom of the div.
}

function createButton(product, consumable) {
	var newButton = document.createElement("button");
	newButton.className = "buyButton";
	newButton.setAttribute("id", product.objID + "Button");
	newButton.onclick = function() { buy(product.objID); };
	newButton.disabled = true;

	if(consumable == true) {
		newButton.innerHTML = "<b>"+ product.displayName + "</b><br />" + beautify(product.price) + " Плюсов (" + product.effectText + ")";
		document.getElementById("consumablesContainer").appendChild(newButton);
	} else {
		newButton.innerHTML = "<b>"+ product.displayName + "</b><br />" + beautify(product.price) + " Плюсов (+" + beautify(product.multiplier) + "пнк, " + beautify(product.пвс) + "пвс)<br />" + "Owned: <b>" + beautify(product.counter) + "</b>";
		document.getElementById("productsContainer").appendChild(newButton);
	}
}

function suckDick() {
	plusgained += multiplier;
	// plusgained += 1000000; 
	allTimeplus += multiplier;
	updateDisplay();
}

function updateDisplay() {
	document.getElementById("plusdisplay").innerHTML = beautify(plusgained);
	document.getElementById("plusFlavorText").innerHTML = displayString;
	document.getElementById("multiplierDisplay").innerHTML = "Ваш множитель плюсов равен " + beautify(multiplier);
	document.getElementById("ppsDisplay").innerHTML = "Ваш пвс равен " + beautify(currentпвс);
	document.getElementById("allTimeplus").innerHTML = "(за всё время: " + beautify(allTimeplus) + ")";
	
	for(i = 0; i < products.length; i++) {
			document.getElementById(products[i].objID + "Button").innerHTML = 
				"<b>"+ products[i].displayName + "</b><br />" +
				beautify(products[i].price) + " Плюсов (+" + beautify(products[i].multiplier) + "пнк, " + beautify(products[i].пвс) + "пвс)<br />" +
				"Owned: <b>" + beautify(products[i].counter) + "</b>";
	}
	
	toggleButtons();
	updateSlogan();
}

function buy(whatToBuy) {
	for(i = 0; i < products.length; i++) {
		if(products[i].objID == whatToBuy) {
			if(plusgained >= products[i].price) {
				plusgained -= products[i].price;
				multiplier += products[i].multiplier;
				currentпвс += products[i].пвс;
				products[i].price = Math.round(products[i].price * 1.1);
				products[i].counter += 1;
				createGrafix(whatToBuy);
				updateDisplay();
				return;
			}
		}
	}
	
	for(j = 0; j < consumables.length; j++) {
		if(consumables[j].objID == whatToBuy) {
			if(plusgained >= consumables[j].price) {
				plusgained -= consumables[j].price;
				multiplier += consumables[j].multiplier;
				currentпвс += consumables[j].пвс;
				
				var newGrafix = document.createElement("img")
				var randTop = Math.floor(Math.random()*101);
				var randLeft = Math.floor(Math.random()*101);
				var flavorText = consumables[j].displayName;
				newGrafix.className = "grafix";
				newGrafix.setAttribute("style", "top: " + randTop + "%; left: " + randLeft + "%;");
				newGrafix.setAttribute("alt", flavorText);
				newGrafix.setAttribute("title", flavorText);
				
				// Boost-specific effects
				switch (whatToBuy) {
					case "adanm":
						if(consumables[1].owned == true) { // if user has /d/ mode already
							displayString = "Модераторских плюсов получено";
						} else {
							displayString = "Ночных плюсов получено";
						}
						
						newGrafix.src = "i/adanm.png"/*tpa=http://doigt.github.io/dsucker/i/adanm.png*/;
						document.body.style.backgroundImage = "url('i/adanmBackground.png'/*tpa=http://doigt.github.io/dsucker/i/adanmBackground.png*/)";
						break;
					case "modmode":
						if(consumables[0].owned == true) { // if user has /v/ mode already
							displayString = "Модераторских плюсов получено";
						} else {
							displayString = "futanari dicks sucked";
						}
						
						newGrafix.src = "i/modmode.png"/*tpa=http://doigt.github.io/dsucker/i/modmode.png*/;
						document.body.style.backgroundImage = "url('i/modmodeBackground.png'/*tpa=http://doigt.github.io/dsucker/i/modmodeBackground.png*/)";
						break;
					case "leagueofplusers":
						newGrafix.src = "i/leagueofplusers.png"/*tpa=http://doigt.github.io/dsucker/i/leagueofplusers.png*/;
						multiplier += multiplier;
						break;
					case "dunnolol":
						newGrafix.src = "i/dunnolol.png"/*tpa=http://doigt.github.io/dsucker/i/dunnolol.png*/;
						currentпвс += currentпвс;
						break;
					case "fluttershyisbestponi":
						newGrafix.src = "i/fluttershyisbestponi.png"/*tpa=http://doigt.github.io/dsucker/i/fluttershyisbestponi.png*/;
						break;
				}

				document.getElementById("grafixContainer").appendChild(newGrafix);
				document.getElementById(consumables[j].objID + "Button").setAttribute("class","hidden");
				consumables[j].owned = true;
				updateDisplay();
			}
		}
	}
}

function toggleButtons() {
	for(i = 0; i < products.length; i++) {
		if(plusgained < products[i].price) {
			document.getElementById(products[i].objID + "Button").disabled = true;
		} else {
			document.getElementById(products[i].objID + "Button").disabled = false;
		}
	}
	
	for(j = 0; j < consumables.length; j++) {
		if(plusgained < consumables[j].price) {
			document.getElementById(consumables[j].objID + "Button").disabled = true;
		} else {
			document.getElementById(consumables[j].objID + "Button").disabled = false;
		}
	}
}

function tick() {
	plusgained += currentпвс;
	allTimeplus += currentпвс;
	updateDisplay();
}

function beautify(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createGrafix(which) {
	var newGrafix = document.createElement("img")
	var randTop = Math.floor(Math.random()*101);
	var randLeft = Math.floor(Math.random()*101);
	var flavorText;
	newGrafix.className = "grafix";
	newGrafix.setAttribute("style", "top: " + randTop + "%; left: " + randLeft + "%;");
	newGrafix.src = "./i/" + which + ".png";
	
	for(i = 0; i < products.length; i++) {
		if(which == products[i].objID) {
			flavorText = products[i].displayName + " #" + beautify(products[i].counter);
			break;
		}
	}
	
	newGrafix.setAttribute("alt", flavorText);
	newGrafix.setAttribute("title", flavorText);
	document.getElementById("grafixContainer").appendChild(newGrafix);
}

function updateSlogan() {
	var slogan = document.getElementById("slogan");
	
	if(allTimeplus <= 500) {
		slogan.innerHTML = "Ты ещё совсем ньюфаг";
	} else if(allTimeplus <= 1000) {
		slogan.innerHTML = "Тебя начинают узнавать новички";
	} else if(allTimeplus <= 5000) {
		slogan.innerHTML = "Люди прислушиваются к тебе";
	} else if(allTimeplus <= 10000) {
		slogan.innerHTML = "Ты чувствуешь небольшую власть над ньюфагами";
	} else if(allTimeplus <= 20000) {
		slogan.innerHTML = "Ты уже на десятой странице в рейтинге";
	} else if(allTimeplus <= 35000) {
		slogan.innerHTML = "Тебя плюсуют даже некоторые олдфаги";
	} else if(allTimeplus <= 50000) {
		slogan.innerHTML = "Каждый обитатель блогов хотел бы, чтобы его рейтинг рос так же быстро, как и твой";
	} else if(allTimeplus <= 100000) {
		slogan.innerHTML = "Даже ваша мама гордится вашим рейтингом";
	} else if(allTimeplus <= 200000) {
		slogan.innerHTML = "Тебе начинает завидовать Сакбой";
	} else if(allTimeplus <= 350000) {
		slogan.innerHTML = "Ещё не написав комментарий тебе мерещатся плюсы";
	} else if(allTimeplus <= 500000) {
		slogan.innerHTML = "Твой компьютер не выключается даже ночью";
	} else if(allTimeplus <= 750000) {
		slogan.innerHTML = "Ты начинаешь поклонятся плюсам";
	} else if(allTimeplus <= 1000000) {
		slogan.innerHTML = "У тебя не осталось не одного непроплюшенного комментария";
	} else if(allTimeplus <= 1250000) {
		slogan.innerHTML = "Модераторы плюсут твои аккаунты по первому требованию";
	} else if(allTimeplus <= 1500000) {
		slogan.innerHTML = "Неугодные аккаунты не живут дольше часа";
	} else if(allTimeplus <= 1750000) {
		slogan.innerHTML = "Слава о твоих плюсах разнеслась за пределы СГ";
	} else if(allTimeplus <= 2000000) {
		slogan.innerHTML = "Asdbanz обсуждает твой рейтинг в каждой курилке";
	} else if(allTimeplus <= 2500000) {
		slogan.innerHTML = "Твой рейтинг больше, чем у Кулакова";
        } else if(allTimeplus <= 2800000) {
		slogan.innerHTML = "В вашу ванну хотят кинуть фен";
        } else if(allTimeplus <= 3200000) {
		slogan.innerHTML = "Ты несёшся сквозь вселенную, и тебя окружают плюсы. Тебе уже не нужна матерьяльная пища. ";
	} else if(allTimeplus <= 3800000) {
		slogan.innerHTML = "[Cвет в конце тоннеля]";
	} else {
		slogan.innerHTML = "Пора завязывать с рейтингом";
	}
}
