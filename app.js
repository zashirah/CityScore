// GET selection from Continent Dropdown on Updated button
const submitContinentButton = document.querySelector('#updateCityList');
submitContinentButton.addEventListener('click', (e) => {
     e.preventDefault();

     const options = document.querySelectorAll('#city option');
     // console.log(options);
     options.forEach(option => {
          option.remove();
     });

     const submittedContinent = document.querySelector('#continents').value
     // console.log(submittedContinent)
     getUrbanAreaList(submittedContinent);
});

// GET Selected City as input for the Summary section
const submitCityButton = document.querySelector('#submit-city');
submitCityButton.addEventListener('click', (e) => {
     e.preventDefault();

     let city = document.querySelector('#city').value;
     city = city.replace(/ /g, '-');
     console.log(city);
     getUrbanAreaBasic(city);
     getUrbanAreaDetails(city);
     getUrbanAreaScores(city);
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
               // data = response.data_links['ua:item'];
               data = response.data._links['ua:items'];
               console.log(data);
               return addListToCityDropdown(data)
          } catch (error) {
               console.log(error);
          };
     };
};
getUrbanAreaList();


// PUT Urban Area List in the City Dropdown
function addListToCityDropdown(list) {
     const cityDropdown = document.querySelector('#city');
     const newOptionDefault = document.createElement('option');
     newOptionDefault.innerText = 'Select City';
     cityDropdown.append(newOptionDefault);

     list.forEach(listElement => {
          const cityDropdown = document.querySelector('#city');

          const newOption = document.createElement('option');
          newOption.value = listElement.name;
          newOption.innerText = listElement.name;

          cityDropdown.append(newOption);
     });
};


// GET basic data
async function getUrbanAreaBasic(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea.toLowerCase()}/`;
     try {
          const response = await axios.get(url);
          data = response.data;
          // console.log(data);
          return putFullName(data);
     } catch (error) {
          console.log(error);
     }
};

// PARSE urban area basic data
// for summary area - Full Name

const putFullName = (basicData) => {
     const summaryDiv = document.querySelector('.summary');
     // data = data.replace(/ /g, '-')

     const newFullName = document.createElement('h3');
     newFullName.className = 'full-name summary-detail';
     newFullName.innerText = basicData.full_name;

     summaryDiv.append(newFullName);
}


// GET scores data
async function getUrbanAreaScores(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea.toLowerCase()}/scores/`;
     try {
          const response = await axios.get(url);
          data = response.data;
          // console.log(data);
          return putQolScoreAndSummary(data);
     } catch (error) {
          console.log(error);
     }
};

// PARSE urban area scores data
// for summary area - QOL Score, Summary
const putQolScoreAndSummary = (scoreData) => {
     // console.log(data)
     const summaryParentDiv = document.querySelector('.summary');

     const newQol = document.createElement('p');
     newQol.className = 'qol-score summary-detail';
     newQol.innerText = `The Total Quality of Life Score is ${Math.round(scoreData.teleport_city_score)}`;

     const summaryDiv = document.querySelector('.summary-div');
     summaryDiv.innerHTML = scoreData.summary;
     // console.log(scoreData.summary);

     const summaryPs = document.querySelectorAll('.summary-div p');
     summaryPs.forEach(summaryP => {
          summaryP.className = 'city-summary summary-detail';
     });

     summaryParentDiv.append(newQol);
     summaryParentDiv.append(summaryDiv);
}




// GET details data
async function getUrbanAreaDetails(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea.toLowerCase()}/details/`;
     try {
          const response = await axios.get(url);
          data = response.data.categories;
          console.log(data);
          return putPopulation(data);
     } catch (error) {
          console.log(error);
     }
};

// PARSE urban area details data
// for summary area - Population 
const putPopulation = (detailData) => {
     const summaryParentDiv = document.querySelector('.summary');

     const population = detailData[1].data[0].float_value.toFixed(2);
     const populationDensity = detailData[1].data[2].float_value.toFixed(1);

     const newPopulation = document.createElement('p');
     newPopulation.className = 'population summary-detail';
     newPopulation.innerText = `The population is ${population} million people with a population density of ${populationDensity} people/sq. km`;

     summaryParentDiv.append(newPopulation);
}




// can get total number of cities from this url: https://api.teleport.org/api/urban_areas/slug:auckland/cities/