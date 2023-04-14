/ Make your References to the two DOM nodes
const buyButton = document.querySelector('.buy-button');

// Create a reference to the element who's ID is 'big_coffee and call it bigCoffee
const bigCoffee = document.getElementById("big_coffee");
// Create a reference to the element who's ID is 'producer_container' and call it producerContainer
const producerContainer = document.getElementById("producer_container");
/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  // Create a reference to the element who's ID is 'coffee_counter'
  /*
  const coffeeCounter = document.getElementById("coffee_counter");
  if (typeof coffeeQty === "number" && !isNaN(coffeeQty)) {
    coffeeCounter.innerText = coffeeQty;
  } else {
    coffeeCounter.innerText = "NaN";}
    */
  // Set the innerText of that element to be the coffeeQty passed into this function
  
    //the above code was used to troubleshoot a NaN issue I ran into with the counter.
    const coffeeCounter = document.getElementById('coffee_counter');
    coffeeCounter.innerText = coffeeQty;
    }



  
function clickCoffee(data) {
  // Increment the data object's (passed into this function) coffee property by one
  data.coffee ++; 
  console.log(data.coffee);
  // call the updateCoffeeView function and pass it the newly updated data.coffee property
  updateCoffeeView(data.coffee);
  // call the renderProducers function and pass it the data object
  renderProducers(data); /*
  data.coffee++;
  coffeeCounter.innerText = data.coffee; */
 }  

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  // loop through the producers array passed into the function
  // for each producer, if the coffeeCount (passed in) is greater than or equal
  // to half the producer's price, reassign the producers.unlocked property to equal true
  for (let i = 0; i < producers.length; i++){
    if (coffeeCount >= producers[i].price / 2) {
      producers[i].unlocked = true;
    }
  }
  /* I just placed the code in a block, but line 38 > 41 and 39/40 > 42/43. */
}

function getUnlockedProducers(data) {
  // use the Array.prototype.filter() method
  // filter through the data.producers property, and return an array with only the producers whose
  // unlocked property is true
    if (!data || typeof data !== 'object' || !Array.isArray(data.producers)) {
      throw new Error('Invalid data object');
    }
    return data.producers.filter(producer => producer.unlocked === true);

    /* Had to google this one! I kept getting an error the producer array didn't exist, tried a normal loop, but found this fix.*/
}


// You do not need to edit this function
function makeDisplayNameFromId(id) {
  return id
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// You do not need to edit this function
function makeProducerDiv(producer) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "producer";
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
    <div class="producer-column">
      <div class="producer-title">${displayName}</div>
      <button type="button" id="buy_${producer.id}">Buy</button>
    </div>
    <div class="producer-column">
      <div>Quantity: ${producer.qty}</div>
      <div>Coffee/second: ${producer.cps}</div>
      <div>Cost: ${currentCost} coffee</div>
    </div>
    `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

// You do not need to edit this function
function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderProducers(data) {
  // call the unlockProducers function and pass it data.producers and data.coffee
  unlockProducers(data.producers, data.coffee);
  // make a reference to the DOM element whose ID is producer_container
  const producerContainer = document.getElementById('producer_container');
  // call the deleteAllChildNodes function and pass it the above producerContainer element
  deleteAllChildNodes(producerContainer);
  // you do not need to edit the following code, but for understanding, this gets the unlocked producers,
  // and for each producer makes a little html div with that producer's info
  getUnlockedProducers(data).forEach((producer) => {
    producerContainer.appendChild(makeProducerDiv(producer));
  });
}

/**************
 *   SLICE 3
 **************/

// You do not need to edit this function
function getProducerById(data, producerId) {
  return data.producers.find((producer) => producerId === producer.id);
}

// You do not need to edit this function
function canAffordProducer(data, producerId) {
  return getProducerById(data, producerId).price <= data.coffee;
}

// You do not need to edit this function
function updateCPSView(cps) {
  const cpsDiv = document.getElementById("cps");
  cpsDiv.innerText = cps;
}

// You do not need to edit this function
function updatePrice(oldPrice) {
  return Math.floor(oldPrice * 1.25);
}

// You do not need to edit this function
function attemptToBuyProducer(data, producerId) {
  if (canAffordProducer(data, producerId)) {
    const producer = getProducerById(data, producerId);
    data.coffee -= producer.price;
    producer.qty += 1;
    producer.price = updatePrice(producer.price);
    data.totalCPS += producer.cps;
    return true;
  } else {
    return false;
  }
}

// You do not need to edit this function
function buyButtonClick(event, data, buttonId) {
  if (event.target.tagName === "BUTTON" && event.target.id === buttonId) {
    const producerId = buttonId.slice(4);
    const result = attemptToBuyProducer(data, producerId);
    if (!result) {
      window.alert("Not enough coffee!");
    } else {
      renderProducers(data);
      updateCoffeeView(data.coffee);
      updateCPSView(data.totalCPS);
    }
  }
}


/* function buyButtonClick(event, data) {
  if (event.target.tagName === "BUTTON") {
    const producerId = event.target.id.slice(4);
    const result = attemptToBuyProducer(data, producerId);
    if (!result) {
      window.alert("Not enough coffee!");
    } else {
      renderProducers(data);
      updateCoffeeView(data.coffee);
      updateCPSView(data.totalCPS);
    }
  }
}  */

function tick(data) {
  // increment the data object's (passed into this function)
  // coffee property by the data.totalCPS amount
  data.Coffee += data.totalCPS;
  // call the updateCoffeeView function and pass it the data.coffee property
  updateCoffeeView(data.Coffee);
  // call the renderProducers function and pass it the newly updated data object
  renderProducers(data);
}

// Event Listeners

// add a 'click' event listener to the bigCoffee element (that you referenced above)
// the event listener should call the clickCoffee function, and pass in the global data object

buyButton.addEventListener('click', function(event) {
  buyButtonClick(event, data);
});

bigCoffee.addEventListener('click', function() {
  clickCoffee(data);
});

document.addEventListener('DOMContentLoaded', function() {
  const buyChemexPressBtn = document.getElementById('buy_chemex');
  buyChemexPressBtn.addEventListener('click', function(event) {
    buyButtonClick(event, data, 'buy_chemex');
  });

/*
bigCoffee.addEventListener('click', function() {
  clickCoffee(window.data);
});
*/

// add a 'click' event listener to the element (referenced at the top of the file)
// the event listener should call the buyButtonClick function and pass it the event, and the global data object


/*
document.addEventListener('DOMContentLoaded', function() {
  const buyChemexPressBtn = document.getElementById('buy_chemex');
  buyChemexPressBtn.addEventListener('click', function(event) {
    buyButtonClick(event, data, 'buy_chemex');
  });
}); 
*/

/*
window.onclick = function(event) {
  if (event.target.id === 'producer_container') {
    buy_chemex.addEventListener('click', function(event) {
      buyButtonClick(event, data, 'producer_container');
    })
       
  }

}
function buyButtonClick(event, data, id) {
  console.log(`Event: ${event}\nData: ${JSON.stringify(data, null, 2)}\nID: ${id}`);
}

bigCoffee.addEventListener('click', function() {
  clickCoffee(data);
});

buy_chemex.addEventListener('click', function(event) {
  buyButtonClick(event, data, 'buy_chemex');
});

function buyButtonClick(event, data, id) {
  console.log(`Event: ${event}\nData: ${JSON.stringify(data, null, 2)}\nID: ${id}`);
}

bigCoffee.addEventListener('click', function() {
  clickCoffee(data);
});

producerContainer.addEventListener('click', function(event) {
  buyButtonClick(event, data, 'buy_chemex');
});

/*
const buyFrenchPressBtn = document.getElementById('french_press');
buyFrenchPressBtn.addEventListener('click', function(event) {
  buyButtonClick(event, data, 'french_press');
});

const buyTenCupUrnBtn = document.getElementById('ten_cup_urn');
buyTenCupUrnBtn.addEventListener('click', function(event) {
  buyButtonClick(event, data, 'ten_cup_urn');
});

*/

// You do not need to edit this last line. This simple runs your tick function every 1000ms, or 1s
setInterval(() => tick(data), 1000); 