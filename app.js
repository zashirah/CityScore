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


// REMOVE summary details for each new submit
const removeSummaryDetails = () => {
     const summaryDetails = document.querySelectorAll('.summary-detail');
     summaryDetails.forEach(summaryDetail => {
          summaryDetail.remove();
     });
};


// REMOVE progress bars for each new submit
const removeProgressBars = () => {
     const progressBars = document.querySelectorAll('.progress-bar');
     progressBars.forEach(progressBar => {
          progressBar.remove();
     });
};

// GET Selected City as input for the Summary section
const submitCityButton = document.querySelector('#submit-city');
submitCityButton.addEventListener('click', (e) => {
     e.preventDefault();

     // removeSummaryDetails();
     // removeProgressBars();

     let city = document.querySelector('#city').value;
     city = city.replace(/ /g, '-');
     city = city.toLowerCase();
     // console.log(city);
     // getUrbanAreaBasic(city);
     // getUrbanAreaDetails(city, 'summary');
     // getUrbanAreaScores(city);
     // getTotalCityCount(city);
});


// GET details section selection
const submitDetailButton = document.querySelector('#submit-detail');
submitDetailButton.addEventListener('click', (e) => {
     e.preventDefault();

     let city = document.querySelector('#city').value;
     city = city.replace(/ /g, '-');
     city = city.toLowerCase();

     const category = document.querySelector('#detail-categories').value;
     console.log(category);

     getUrbanAreaDetails(city, 'details', category);
})


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
          try {
               const allUrl = 'https://api.teleport.org/api/urban_areas';
               const response = await axios.get(allUrl);
               data = response.data._links['ua:item'];
               // console.log(data);
               return addListToCityDropdown(data)
          } catch (error) {
               console.log('Error', error);
          };
     } else {
          try {
               const continetUrl = `https://api.teleport.org/api/continents/geonames%3A${continent}/urban_areas`;
               const response = await axios.get(continetUrl);
               // data = response.data_links['ua:item'];
               data = response.data._links['ua:items'];
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
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/`;
     try {
          const response = await axios.get(url);
          data = response.data;
          // console.log(data);
          return putFullName(data);
     } catch (error) {
          console.log('Error', error);
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
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/scores/`;
     try {
          const response = await axios.get(url);
          data = response.data;
          // console.log(data);
          return putQolScoreAndSummary(data),
               putScores(data);
     } catch (error) {
          console.log('Error', error);
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

// PARSE urban areas scores data 
// for scores area
const putScores = (scoreData) => {
     // console.log(scoreData);
     let i = 0;
     const leftProgressBar = document.querySelector('.left-progress-bars');
     const rightProgressBar = document.querySelector('.right-progress-bars');
     scoreData.categories.forEach(score => {
          // console.log(score);

          const newProgressBar = document.createElement('div');
          newProgressBar.className = 'progress-bar';

          const newCategoryName = document.createElement('p');
          newCategoryName.className = 'qol-category';
          newCategoryName.innerText = score.name;

          const newMeter = document.createElement('div');
          newMeter.classList.toggle('meter');

          const newMeterSpan = document.createElement('span');
          const scorePct = score.score_out_of_10 * 10;
          if (scorePct <= 33) {
               newMeter.classList.toggle('red');
          } else if (scorePct > 33 && scorePct <= 67) {
               newMeter.classList.toggle('orange');
          };
          // console.log(scorePct);
          newMeterSpan.style.width = `${scorePct}%`;

          if (i < 8) {
               // add to left column
               leftProgressBar.append(newProgressBar);
               newProgressBar.append(newCategoryName);
               newProgressBar.append(newMeter);
               newMeter.append(newMeterSpan);
          } else {
               // add to right column
               rightProgressBar.append(newProgressBar);
               newProgressBar.append(newCategoryName);
               newProgressBar.append(newMeter);
               newMeter.append(newMeterSpan);
          }

          i++
     });
}


// GET details data
async function getUrbanAreaDetails(urbanArea, section, category = false) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/details/`;
     try {
          const response = await axios.get(url);
          data = response.data.categories;
          // console.log(data);
          if (section === 'summary') {
               return putPopulation(data)
          } else {
               return putCategoryDetails(data, category);
          }
     } catch (error) {
          console.log('Error', error);
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


// PARSE urban area details data
// for details area

const putMinorities = (minorityData) => {
     const detailsUl = document.querySelector('.details-ul');
     // console.log(minorityData.data);
     minorityData.data.forEach(minorityStat => {
          // console.log(minorityStat)
          const newStatLi = document.createElement('li')
          newStatLi.className = 'detail-output';

          const newStatP = document.createElement('p');
          newStatP.className = 'details-output-text';

          if (minorityStat.type === 'string') {
               newStatP.innerText = `${minorityStat.label}: ${minorityStat.string_value}`
          } else if (minorityStat.type === 'float') {
               newStatP.innerText = `${minorityStat.label}: ${minorityStat.float_value}`
          } else {
               newStatP.innerText = `${minorityStat.label}: ${minorityStat.percent_value}`
          }
          // newStatP.innerText = minorityStat

          detailsUl.append(newStatLi);
          newStatLi.append(newStatP);

     });
}


const putCategoryDetails = (detailData, category) => {

     detailData.forEach(detail => {
          if (category === detail.id) {
               if (category === 'MINORITIES') {
                    putMinorities(detail);
               }
          }

     });
}


// GET total number of cities: 
async function getTotalCityCount(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/cities/`;
     try {
          const response = await axios.get(url);
          data = response.data.count;
          // console.log(data);
          return putCitiesCount(data);
     } catch (error) {
          console.log('Error', error);
     }
};

// PARSE urban area cities
// for summary area - total city count 
const putCitiesCount = (urbanCitiesData) => {
     const summaryParentDiv = document.querySelector('.summary');

     const cityCount = urbanCitiesData;

     const newCityCount = document.createElement('p');
     newCityCount.className = 'city-count summary-detail';
     newCityCount.innerText = `There are ${cityCount} total cities in the Urban Area`;

     summaryParentDiv.append(newCityCount);
}

