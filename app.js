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


// REMOVE details li's from the bottom
const removeDetails = () => {
     const details = document.querySelectorAll('.detail-output');
     details.forEach(detail => {
          detail.remove();
     });
}

// GET Selected City as input for the Summary section
const submitCityButton = document.querySelector('#submit-city');
submitCityButton.addEventListener('click', (e) => {
     e.preventDefault();

     removeSummaryDetails();
     removeProgressBars();
     removeDetails();

     let city = document.querySelector('#city').value;
     city = city.replace(/ /g, '-');
     city = city.toLowerCase();

     getUrbanAreaBasic(city);
     getUrbanAreaDetails(city, 'summary');
     getUrbanAreaScores(city);
     getTotalCityCount(city);
     getImages(city);
});


// GET details section selection
const submitDetailButton = document.querySelector('#submit-detail');
submitDetailButton.addEventListener('click', (e) => {
     e.preventDefault();

     removeDetails();

     let city = document.querySelector('#city').value;
     city = city.replace(/ /g, '-');
     city = city.toLowerCase();

     const category = document.querySelector('#detail-categories').value;

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
               return addListToCityDropdown(data)
          } catch (error) {
               console.log('Error', error);
          };
     } else {
          try {
               const continetUrl = `https://api.teleport.org/api/continents/geonames%3A${continent}/urban_areas`;
               const response = await axios.get(continetUrl);
               data = response.data._links['ua:items'];
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
          return putFullName(data);
     } catch (error) {
          console.log('Error', error);
     }
};

// PARSE urban area basic data
// for summary area - Full Name
const putFullName = (basicData) => {
     const summaryDiv = document.querySelector('.summary');

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

          return putQolScoreAndSummary(data),
               putScores(data);
     } catch (error) {
          console.log('Error', error);
     }
};

// PARSE urban area scores data
// for summary area - QOL Score, Summary
const putQolScoreAndSummary = (scoreData) => {

     const summaryParentDiv = document.querySelector('.summary');
     const summaryList = document.querySelector('.summary-list');

     const newQol = document.createElement('li');
     newQol.className = 'qol-score summary-detail summary-list-item';
     newQol.innerText = `Total Quality of Life Score: ${Math.round(scoreData.teleport_city_score)}`;

     const summaryDiv = document.querySelector('.summary-div');
     summaryDiv.innerHTML = scoreData.summary;

     const summaryPs = document.querySelectorAll('.summary-div p');
     summaryPs.forEach(summaryP => {
          summaryP.className = 'city-summary summary-detail';
     });

     summaryList.append(newQol);
     summaryParentDiv.append(summaryDiv);
}


// PARSE urban areas scores data 
// for scores area
const putScores = (scoreData) => {
     let i = 0;
     const leftProgressBar = document.querySelector('.left-progress-bars');
     const rightProgressBar = document.querySelector('.right-progress-bars');
     scoreData.categories.forEach(score => {

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


// PUT details dropdown from urban areas details
const putDetailsDropdown = (detailData) => {
     // console.log(detailData);
     const detailsDropdown = document.querySelector('#detail-categories');

     const detailOptions = document.querySelectorAll('.detail-option');
     console.log(detailOptions.length)
     if (detailOptions.length <= 1) {

          detailData.forEach(detail => {
               const newOption = document.createElement('option');
               newOption.value = detail.id;
               newOption.innerText = detail.label;
               newOption.className = 'detail-option';

               detailsDropdown.append(newOption);
          });
     }
}


// GET details data
async function getUrbanAreaDetails(urbanArea, section, category = false) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/details/`;
     try {
          const response = await axios.get(url);
          data = response.data.categories;
          // console.log(data);
          if (section === 'summary') {
               return putPopulation(data),
                    putDetailsDropdown(data);
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
     const summaryList = document.querySelector('.summary-list');

     const population = detailData[1].data[0].float_value.toFixed(2);
     const populationDensity = detailData[1].data[2].float_value.toFixed(1);

     const newPopulation = document.createElement('li');
     newPopulation.className = 'population summary-detail summary-list-item';
     newPopulation.innerText = `Population: ${population} million`;

     const newPopulationDensity = document.createElement('li');
     newPopulationDensity.className = 'population-density summary-detail summary-list-item';
     newPopulationDensity.innerText = `Population Density: ${populationDensity} people / sq.km`;

     summaryList.append(newPopulation);
     summaryList.append(newPopulationDensity);
}


// PARSE urban area details data
// for details area
const putCategoryDetails = (detailData, category) => {
     const detailsUl = document.querySelector('.details-ul');
     detailData.forEach(detail => {
          if (detail.id === category) {
               detail.data.forEach(detailStat => {
                    const newStatLi = document.createElement('li')
                    newStatLi.className = 'detail-output';

                    const newStatP = document.createElement('p');
                    newStatP.className = 'details-output-text';

                    if (detailStat.type === 'string') {
                         newStatP.innerText = `${detailStat.label}: ${detailStat.string_value}`
                    } else if (detailStat.type === 'float') {
                         newStatP.innerText = `${detailStat.label}: ${detailStat.float_value}`
                    } else if (detailStat.type === 'percent') {
                         newStatP.innerText = `${detailStat.label}: ${(detailStat.percent_value * 100).toFixed(2)}%`
                    } else if (detailStat.type === 'currency_dollar') {
                         newStatP.innerText = `${detailStat.label}: $${(detailStat.currency_dollar_value).toFixed(2)}`
                    }

                    detailsUl.append(newStatLi);
                    newStatLi.append(newStatP);
               });
          }
     });
};

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
     const summaryParentDiv = document.querySelector('.summary-list');

     const cityCount = urbanCitiesData;

     const newCityCount = document.createElement('li');
     newCityCount.className = 'city-count summary-detail summary-list-item';
     newCityCount.innerText = `Total Cities: ${cityCount}`;

     summaryParentDiv.append(newCityCount);
}

// GET images 
async function getImages(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/images/`;
     try {
          const response = await axios.get(url);
          data = response.data.photos[0].image;
          console.log(data);
          return putImages(data);
     } catch (error) {
          console.log('Error', error);
     }
};

const putImages = (imageData) => {
     const imgDiv = document.querySelector('.image-div');

     const newMobileImage = document.createElement('img');
     newMobileImage.src = imageData.mobile;
     newMobileImage.className = 'mobile-image summary-detail'

     // const newWebImage = document.createElement('img');
     // newWebImage.src = imageData.web;
     // newWebImage.className = 'web-image';

     imgDiv.append(newMobileImage);
     // imgDiv.append(newWebImage);
}