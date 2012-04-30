/**
 * licenseplate.js
 *
 * author	 Mark Willson
 *
 * Code for calculating license plate information for a given population.
 */
 
/* displayPop - displays information about license plates produced */

function displayPop(form){
  var info = calcNums(form.popinput.value);
  document.getElementById('poplabel').innerHTML = 'The number of plates produced is: ' + info[0];
  document.getElementById('numbers').innerHTML = 'The number of numbers on a plate is: ' + info[1];
  document.getElementById('letters').innerHTML = 'The number of letters on a plate is: ' + info[2];
  document.getElementById('excess').innerHTML = 'The excess amount of plates is: ' + info[3];
   // var lp = new LicensePlate(form.popinput.value);
}

/* LicensePlate - constructor for a license plate object
 * not currently used
 * future use - generation of a random plate in the population
 */
 
function LicensePlate(pop) {
  this.population  = pop;  
}

/* calcNums - returns an array with [0] the number of plates, [1] the x (number of numbers), and 
 * [2] the y (number of letters) values
 */
 
function calcNums(pop) { 

  var x = 0, y = 0, xpop = 0, ypop = 0, pow = 0;
  var xover = new Boolean(false);
  var yover = new Boolean(false);

  while( xover == false || yover == false ) {
    if(xover == false)x++;
    if(yover == false)y++;
    xpop = Math.pow(10,x);
    ypop = Math.pow(26,y);
    if(xpop >= pop)xover = true;
    if(ypop >= pop)yover = true;
  }

  if( x > y )pow = x;
  else pow = y;
  return findLowest(pow, pop);
  
}

/* findLowest - loops down through possibilities to find the lowest possible production
 * number while staying above the population
 */
 
function findLowest(power, pop) {

  var temp = 0;
  var lowest = new Array();
  lowest[0] = Math.pow(26,power);
  
  for( var i = power; i >= 0; i-- ) {
    for( var j = power; j >= 0; j-- ) {
	  temp = Math.pow(10,i)*Math.pow(26,j);
	  if( temp < lowest[0] && temp >= pop ) {
	    lowest[0] = temp;
		lowest[1] = i;
		lowest[2] = j;
	  }	
	}
  }
  
  lowest[3] = lowest[0] - pop; 
  
  return lowest;
  
}