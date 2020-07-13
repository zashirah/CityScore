// GET selection from Continent Dropdown on Updated button
const submitContinentButton = document.querySelector('#updateCityList');
submitContinentButton.addEventListener('click', (e) => {
     e.preventDefault();
     const submittedContinent = document.querySelector('#continents').value
     console.log(submittedContinent);
});




// GET Urban Areas List based on Continent dropdown




async function getUrbanAreaList() {
     const url = 'https://api.teleport.org/api/urban_areas';
     try {
          const response = await axios.get(url);
          data = response.data._links['ua:item'];
          console.log(data);
          return data
     } catch (error) {
          console.log(error);
     }
};
getUrbanAreaList();