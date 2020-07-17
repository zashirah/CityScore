
//  WORKING - want to add section for using "enter" on the list to submit the change
const continentDropdown = document.querySelector('#continents');

continentDropdown.addEventListener('keyup', (e) => {
     if (e.keyCode === 13) {
          e.preventDefault();
          const submittedContinent = document.querySelector('#continents').value
          console.log(submittedContinent);
     }
})


// GET HEIGHT OF A SECTION ?????

const summary = document.querySelector('.summary');
console.log(1)
console.log(summary.clientHeight);



// https://dev.virtualearth.net/REST/V1/Imagery/Map/road?mapArea=32.844,-85.386,34.618,-83.269&key=APIKEY&format=jpeg

// south, west, north, east
