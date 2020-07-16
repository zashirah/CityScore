// LAUNCH compare view
const toggleClassList = (identifyingClass, toggleClass) => {
     const elements = document.querySelectorAll(identifyingClass);

     console.log(elements.length);
     console.log(elements);
     if (elements.length >= 1) {
          console.log(2)
          elements.forEach(element => {
               console.log(3)
               console.log(element)
               element.classList.toggle(toggleClass);
          });
     } else if (elements.length === 1) {
          console.log(1)
          const element = document.querySelector(identifyingClass);
          element.classList.toggle(toggleClass)
     }
}


const compareButton = document.querySelector('.compare-button');
compareButton.addEventListener('click', (e) => {
     e.preventDefault();

     toggleClassList('.main-div', 'side-by-side');
     toggleClassList('.select-form', 'compare');
     toggleClassList('.summary', 'compare');
     toggleClassList('.score', 'compare');
     toggleClassList('.details', 'compare');
     toggleClassList('.city-section-compare', 'no-show-compare-button');
     toggleClassList('.summary-compare', 'no-show-compare-button');
     toggleClassList('.score-compare', 'no-show-compare-button');
     toggleClassList('.details-compare', 'no-show-compare-button');
     toggleClassList('.select-form-compare', 'no-show-compare-button');

     const buttonText = document.querySelector('.compare-button').innerText;
     if (buttonText === 'Compare') {
          document.querySelector('.compare-button').innerText = 'Single'
     } else {
          document.querySelector('.compare-button').innerText = 'Compare'
     }
});


// function for the continent submission button
function getContinentValueForCityList(compare = '') {
     toggleClassList(`.no-show-1${compare}`, `no-show-1${compare}`);

     const options = document.querySelectorAll(`#city${compare} option`);
     options.forEach(option => {
          option.remove();
     });

     const submittedContinent = document.querySelector(`#continents${compare}`).value;
     getUrbanAreaList(submittedContinent, compare)
}


// get continent value when continent button is submitted 
const submitContinentButton = document.querySelector('#update-city-list');
submitContinentButton.addEventListener('click', (e) => {
     e.preventDefault();
     getContinentValueForCityList()
});


// get continent value when continent button is submitted - COMPARE
const submitContinentButtonCompare = document.querySelector('#update-city-list-compare');
submitContinentButtonCompare.addEventListener('click', (e) => {
     e.preventDefault()
     getContinentValueForCityList('-compare');
});


// function to remove a array of elements
function removeElements(identifyingClass) {
     const elementDetails = document.querySelectorAll(identifyingClass);
     elementDetails.forEach(elementDetail => {
          elementDetail.remove();
     });
};


// Function for the city button submission
function getCityValueAndBuildPage(compare = '') {
     toggleClassList(`.no-show${compare}`, `no-show${compare}`);

     removeElements(`.summary-detail${compare}`);
     removeElements(`.progress-bar${compare}`);
     removeElements(`.detail-output${compare}`);

     let city = document.querySelector(`#city${compare}`).value;
     city = city.replace(/ /g, '-');
     city = city.replace(/[,.]/g, '');
     city = city.toLowerCase();

     getImages(city, compare);
     getUrbanAreaBasic(city, compare);
     getUrbanAreaScores(city, compare);
     getUrbanAreaDetails(city, 'summary', false, compare);
     getTotalCityCount(city, compare);
}

// update all the city info when the sity button is clicked
const submitCityButton = document.querySelector('#submit-city');
submitCityButton.addEventListener('click', (e) => {
     e.preventDefault();
     getCityValueAndBuildPage();
});

// update all the city info when the sity button is clicked - COMPARE
const submitCityButtonCompare = document.querySelector('#submit-city-compare');
submitCityButtonCompare.addEventListener('click', (e) => {
     e.preventDefault();
     getCityValueAndBuildPage('-compare');
});


// function for the details section submission
function getCategoryAndCreateList(compare = '') {
     removeElements(`.detail-output${compare}`);

     let city = document.querySelector(`#city${compare}`).value;
     city = city.replace(/ /g, '-');
     city = city.toLowerCase();

     const category = document.querySelector(`#detail-categories${compare}`).value;

     getUrbanAreaDetails(city, 'details', category, compare);
}


// GET details section selection
const submitDetailButton = document.querySelector('#submit-detail');
submitDetailButton.addEventListener('click', (e) => {
     e.preventDefault();
     getCategoryAndCreateList();
});


// GET details section selection - COMPARE
const submitDetailButtonCompare = document.querySelector('#submit-detail-compare');
submitDetailButtonCompare.addEventListener('click', (e) => {
     e.preventDefault();
     getCategoryAndCreateList('-compare');
})


// GET Urban Areas List based on Continent dropdown
async function getUrbanAreaList(continent, compare = '') {
     // console.log(continent)
     if (continent === 'all') {
          try {
               const allUrl = 'https://api.teleport.org/api/urban_areas';
               const response = await axios.get(allUrl);
               data = response.data._links['ua:item'];
               return addListToCityDropdown(data, compare)
          } catch (error) {
               console.log('Error', error);
          };
     } else {
          try {
               const continetUrl = `https://api.teleport.org/api/continents/geonames%3A${continent}/urban_areas`;
               const response = await axios.get(continetUrl);
               data = response.data._links['ua:items'];
               return addListToCityDropdown(data, compare)
          } catch (error) {
               console.log(error);
          };
     };
};


// PUT Urban Area List in the City Dropdown
function addListToCityDropdown(list, compare = '') {
     const cityDropdown = document.querySelector(`#city${compare}`);
     const newOptionDefault = document.createElement('option');
     newOptionDefault.innerText = 'Select City';
     cityDropdown.append(newOptionDefault);

     list.forEach(listElement => {
          const cityDropdown = document.querySelector(`#city${compare}`);

          const newOption = document.createElement('option');
          newOption.value = listElement.name;
          newOption.innerText = listElement.name;

          cityDropdown.append(newOption);
     });
};


// GET basic data
async function getUrbanAreaBasic(urbanArea, compare = '') {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/`;
     try {
          const response = await axios.get(url);
          data = response.data;
          return putFullName(data, compare);
     } catch (error) {
          console.log('Error', error);
     }
};


// PARSE urban area basic data
// for summary area - Full Name
const putFullName = (basicData, compare = '') => {
     const fullNameSummaryDiv = document.querySelector(`.summary-header-div${compare}`);

     const newFullName = document.createElement('h3');
     newFullName.className = `full-name${compare} summary-detail${compare}`;
     newFullName.innerText = basicData.full_name.toUpperCase();

     fullNameSummaryDiv.append(newFullName);
}


// GET scores data
async function getUrbanAreaScores(urbanArea, compare = '') {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/scores/`;
     try {
          const response = await axios.get(url);
          data = response.data;

          return putQolScoreAndSummary(data, compare),
               putScores(data, compare);
     } catch (error) {
          console.log('Error', error);
     }
};


// PARSE urban area scores data
// for summary area - QOL Score, Summary
const putQolScoreAndSummary = (scoreData, compare = '') => {

     const summaryDiv = document.querySelector(`.summary-div${compare}`);
     summaryDiv.innerHTML = scoreData.summary;

     const summaryPs = document.querySelectorAll(`.summary-div${compare} p`);
     summaryPs.forEach(summaryP => {
          summaryP.className = `city-summary${compare} summary-detail${compare}`;
     });

     const summaryList = document.querySelector(`.summary-list${compare}`);

     const newQol = document.createElement('li');
     newQol.className = `qol-score${compare} summary-detail${compare} summary-list-item${compare}`;
     newQol.innerText = `TOTAL QUALITY OF LIFE SCORE: ${Math.round(scoreData.teleport_city_score)}`;

     summaryList.append(newQol);
}


// PARSE urban areas scores data 
// for scores area
const putScores = (scoreData, compare = '') => {
     let i = 0;
     const leftProgressBar = document.querySelector(`.left-progress-bars${compare}`);
     const rightProgressBar = document.querySelector(`.right-progress-bars${compare}`);
     scoreData.categories.forEach(score => {

          const newProgressBar = document.createElement('div');
          newProgressBar.className = `progress-bar${compare}`;

          const newCategoryName = document.createElement('p');
          newCategoryName.className = `qol-category${compare}`;
          if (score.name === 'Environmental Quality') {
               newCategoryName.innerText = 'Quality of Environment';
          } else {
               newCategoryName.innerText = score.name;
          }

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
const putDetailsDropdown = (detailData, compare = '') => {
     const detailsDropdown = document.querySelector(`#detail-categories${compare}`);

     const detailOptions = document.querySelectorAll(`.detail-option${compare}`);

     detailOptions.forEach(detailOption => {
          detailOption.remove()
     });

     detailData.forEach(detail => {
          const newOption = document.createElement('option');
          newOption.value = detail.id;
          newOption.innerText = detail.label;
          newOption.className = `detail-option${compare}`;

          detailsDropdown.append(newOption);
     });
}


// GET details data
async function getUrbanAreaDetails(urbanArea, section, category = false, compare = '') {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/details/`;
     try {
          const response = await axios.get(url);
          data = response.data.categories;
          if (section === 'summary') {
               return putPopulation(data, compare),
                    putDetailsDropdown(data, compare);
          } else {
               return putCategoryDetails(data, category, compare);
          }
     } catch (error) {
          console.log('Error', error);
     }
};


// PARSE urban area details data
// for summary area - Population 
const putPopulation = (detailData, compare = '') => {
     const summaryList = document.querySelector(`.summary-list${compare}`);

     const population = detailData[1].data[0].float_value.toFixed(2);
     const populationDensity = detailData[1].data[2].float_value.toFixed(1);

     const newPopulation = document.createElement('li');
     newPopulation.className = `population${compare} summary-detail${compare} summary-list-item${compare}`;
     newPopulation.innerText = `POPULATION: ${population} million`;

     const newPopulationDensity = document.createElement('li');
     newPopulationDensity.className = `population-density${compare} summary-detail${compare} summary-list-item${compare}`;
     newPopulationDensity.innerText = `POPULATION DENSITY: ${populationDensity} ppl / sq.km`;

     summaryList.append(newPopulation);
     summaryList.append(newPopulationDensity);
}


// PARSE urban area details data
// for details area
const putCategoryDetails = (detailData, category, compare = '') => {
     const detailsUl = document.querySelector(`.details-ul${compare}`);
     detailData.forEach(detail => {
          if (detail.id === category) {
               detail.data.forEach(detailStat => {
                    const newStatLi = document.createElement('li')
                    newStatLi.className = `detail-output${compare}`;

                    if (detailStat.type === 'string') {
                         newStatLi.innerText = `${detailStat.label.toUpperCase()}: ${detailStat.string_value}`
                    } else if (detailStat.type === 'float') {
                         newStatLi.innerText = `${detailStat.label.toUpperCase()}: ${(detailStat.float_value).toFixed(2)}`
                    } else if (detailStat.type === 'percent') {
                         newStatLi.innerText = `${detailStat.label.toUpperCase()}: ${(detailStat.percent_value * 100).toFixed(2)}%`
                    } else if (detailStat.type === 'currency_dollar') {
                         newStatLi.innerText = `${detailStat.label.toUpperCase()}: $${(detailStat.currency_dollar_value).toFixed(2)}`
                    } else if (detailStat.type === 'int') {
                         newStatLi.innerText = `${detailStat.label.toUpperCase()}: ${detailStat.int_value}`
                    } else if (detailStat.type === 'url') {
                         newStatLi.innerText = `${detailStat.label.toUpperCase()}: ${detailStat.url_value}`
                    }

                    detailsUl.append(newStatLi);
               });
          }
     });
};


// GET total number of cities: 
async function getTotalCityCount(urbanArea, compare = '') {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/cities/`;
     try {
          const response = await axios.get(url);
          data = response.data.count;
          return putCitiesCount(data, compare);
     } catch (error) {
          console.log('Error', error);
     }
};


// PARSE urban area cities
// for summary area - total city count 
const putCitiesCount = (urbanCitiesData, compare = '') => {
     const summaryParentDiv = document.querySelector(`.summary-list${compare}`);

     const cityCount = urbanCitiesData;

     const newCityCount = document.createElement('li');
     newCityCount.className = `city-count${compare} summary-detail${compare} summary-list-item${compare}`;
     newCityCount.innerText = `TOTAL CITIES: ${cityCount}`;

     summaryParentDiv.append(newCityCount);
}


// GET images 
async function getImages(urbanArea, compare = '') {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/images/`;
     try {
          const response = await axios.get(url);
          data = response.data.photos[0].image;
          return putImages(data, compare);
     } catch (error) {
          console.log('Error', error);
     }
};


// put image in summary area
const putImages = (imageData, compare = '') => {
     const imgDiv = document.querySelector(`.image-div${compare}`);

     const newMobileImage = document.createElement('img');
     newMobileImage.src = imageData.mobile;
     newMobileImage.alt = 'city image';
     newMobileImage.className = `mobile-image${compare} summary-detail${compare}`

     imgDiv.append(newMobileImage);
}
