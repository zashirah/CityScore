
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