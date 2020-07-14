// GET selection from Continent Dropdown on Updated button
const submitContinentButton = document.querySelector('#updateCityList');
submitContinentButton.addEventListener('click', (e) => {
     e.preventDefault();
     const submittedContinent = document.querySelector('#continents').value
     console.log(submittedContinent)
     getUrbanAreaList(submittedContinent);
});


//  WORKING - want to add section for using "enter" on the list to submit the change

// const continentDropdown = document.querySelector('#continents');

// continentDropdown.addEventListener('keyup', (e) => {
//      if (e.keyCode === 13) {
//           e.preventDefault();
//           const submittedContinent = document.querySelector('#continents').value
//           console.log(submittedContinent);
//      }
// })


// GET Urban Areas List based on Continent dropdown
async function getUrbanAreaList(continent) {
     if (continent === 'all') {
          const allUrl = 'https://api.teleport.org/api/urban_areas';
          try {
               const response = await axios.get(allUrl);
               data = response.data._links['ua:item'];
               // console.log(data);
               return addListToCityDropdown(data)
          } catch (error) {
               console.log(error);
          };
     } else {
          const continetUrl = `https://api.teleport.org/api/continents/geonames%3A${continent}/urban_areas`;
          try {
               const response = await axios.get(continetUrl);
               data = response.data_links['ua:item'];
               // console.log(data);
               return addListToCityDropdown(data)
          } catch (error) {
               console.log(error);
          };
     };
};
getUrbanAreaList();


// PUT Urban Area List in the City Dropdown
function addListToCityDropdown(list) {
     list.forEach(listElement => {
          const cityDropdown = document.querySelector('#cities');

          const newOption = document.createElement('option');
          newOption.value = listElement.name;
          newOption.innerText = listElement.name;

          cityDropdown.append(newOption);
     });
};


// GET Selected City

