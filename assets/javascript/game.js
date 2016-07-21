var singers = [
	{
		"name": "Bob",
		image: 'http://www.indiewire.com/wp-content/uploads/2012/02/Bob_Marley_Legend.jpg',
		clip: 'https://www.youtube.com/embed/OFGgbT_VasI?autoplay=1'
	},
	{
		"name": "Jano",
		image: 'http://cosmopolite.no/var/cosmopolite/storage/images/galleries2/jano_band/81737-1-nor-NO/jano_band_large.jpg',
		clip: 'https://www.youtube.com/embed/mwKp2RaO7Ek?autoplay=1'
	},
	{
		name: 'Teddy',
		image: 'http://www.mereja.com/amharic/wp-content/uploads/Teddy-Afro-concert.jpg',
		clip: 'https://www.youtube.com/embed/8Ac2MlI8oNk?autoplay=1'
	},
	{
		name: 'Weekend',
		image: 'http://www.midksnews.com/wp-content/uploads/syndicated/gty_taylor_swift_jc_160711_16x9_992.jpg',
		clip: 'https://www.youtube.com/embed/M7mSqx3xHFY?autoplay=1'
	}

];
var current = null;
var counter = 12;
var resetValue = 12;
var guessed = [];
var log =[];
var loss = 0;
var win =0;
function updateMyGuess()
{
	var input = document.getElementById('userInput').value;
	input = input.replace("", "");
	console.log(input);
	if (input == '' || input == undefined)
		return;
	//Check duplicate 
	for (var i = 0; i < log.length; i++) {
		if (log[i].toLowerCase() == input) {
			clearInput();
			return;
		}
	}

	log.push(input);
	counter--;
	
	if (counter <= 1) {
		loss++;		
		document.querySelector('#lostCount').innerHTML = loss;
		resetEverything();
		document.querySelector('#correct').innerHTML = '';
		return;
	}


	if (current != null)
	{
		
		if (current.name.toLowerCase().match(input.toLowerCase())) {
			console.log("match found");
			guessed.push(input);
			console.log(current, guessed);
		}
		var span = '';
		var verify = ''
		for (var k = 0; k < current.name.length; k++) {
			console.log(guessed);
			var found = false;
			
			for (var i = 0; i < guessed.length; i++) {
				if (current.name[k].toLowerCase() == guessed[i].toLowerCase()) {
					span += '<div class="input">' + current.name[k] + '</div>'
					verify += current.name[k];
					found = true;
				}
				
			}
			if (!found) {
				span += '<div class="input">__</div>'
			}
		}
	
			
		document.querySelector('#correct').innerHTML = span;		
		document.querySelector('#results').innerText += input;
		if (current.name == verify) {
			win++;
			document.querySelector('#winCount').innerHTML = win;
			document.querySelector('#singerImg').src = current.image;
			document.querySelector('#singerClip').src = current.clip;
			resetEverything();
		}

		clearInput();
		return;
	}
	

	

	
	for (var i = 0; i < singers.length; i++)
	{
		current = singers[i];;
		if (current.name.toLowerCase().match(input.toLowerCase()))
		{
			console.log("match found");
			guessed.push(input);
			console.log(current, guessed);
		}
	
		if (guessed.length > 0) {
			console.log(current, guessed);
			var span = "";
			for (var k = 0; k < current.name.length; k++) {

				if (current.name[k].toLowerCase() == input.toLowerCase())
				{
					span += '<div class="input">' + current.name[k] + '</div>'
				}
				else {
					span += '<div class="input">__</div>'
				}
			}
			 document.querySelector('#correct').innerHTML = span;
			break;
		} 
	}
	if (guessed.length <= 0) { current = null;}

	document.querySelector('#countDown').innerText = counter;
	var results = document.querySelector('#results').innerText += input;
	clearInput();

}

function clearInput() {
	document.getElementById('userInput').value = "";
	document.getElementById('userInput').focus();
};

function resetEverything()
{
	counter = resetValue;
	var results = document.querySelector('#results').innerText = '';
	document.querySelector('#countDown').innerText = counter;

	current = null;
	guessed = [];
	clearInput();
	log = [];
}

clearInput();