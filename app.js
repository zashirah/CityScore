// LAUNCH compare view
const toggleClassList = (identifyingClass, toggleClass) => {
     const element = document.querySelector(identifyingClass);
     element.classList.toggle(toggleClass)
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

// TOGGLE ON the cities component
const toggleOnSection1 = () => {
     const noShowers = document.querySelectorAll('.no-show-1')

     if (noShowers) {
          noShowers.forEach(noShower => {
               noShower.classList.toggle('no-show-1');
          });
     }
}


// GET selection from Continent Dropdown on Updated button
const submitContinentButton = document.querySelector('#update-city-list');
submitContinentButton.addEventListener('click', (e) => {
     e.preventDefault();

     toggleOnSection1();

     const options = document.querySelectorAll('#city option');
     options.forEach(option => {
          option.remove();
     });

     const submittedContinent = document.querySelector('#continents').value
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


// TOGGLE ON the components that aren't showing
const toggleOnSections = () => {
     const noShowers = document.querySelectorAll('.no-show')

     if (noShowers) {
          noShowers.forEach(noShower => {
               noShower.classList.toggle('no-show');
          });
     }
}


// GET Selected City as input for the Summary section
const submitCityButton = document.querySelector('#submit-city');
submitCityButton.addEventListener('click', (e) => {
     e.preventDefault();

     toggleOnSections();

     removeSummaryDetails();
     removeProgressBars();
     removeDetails();

     let city = document.querySelector('#city').value;
     city = city.replace(/ /g, '-');
     city = city.replace(/[,.]/g, '');
     city = city.toLowerCase();

     getImages(city);
     getUrbanAreaBasic(city);
     getUrbanAreaScores(city);
     getUrbanAreaDetails(city, 'summary');
     getTotalCityCount(city);
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
     const fullNameSummaryDiv = document.querySelector('.summary-header-div');

     const newFullName = document.createElement('h3');
     newFullName.className = 'full-name summary-detail';
     newFullName.innerText = basicData.full_name.toUpperCase();

     fullNameSummaryDiv.append(newFullName);
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

     const summaryDiv = document.querySelector('.summary-div');
     summaryDiv.innerHTML = scoreData.summary;

     const summaryPs = document.querySelectorAll('.summary-div p');
     summaryPs.forEach(summaryP => {
          summaryP.className = 'city-summary summary-detail';
     });

     const summaryList = document.querySelector('.summary-list');

     const newQol = document.createElement('li');
     newQol.className = 'qol-score summary-detail summary-list-item';
     newQol.innerText = `TOTAL QUALITY OF LIFE SCORE: ${Math.round(scoreData.teleport_city_score)}`;

     summaryList.append(newQol);
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
const putDetailsDropdown = (detailData) => {
     const detailsDropdown = document.querySelector('#detail-categories');

     const detailOptions = document.querySelectorAll('.detail-option');

     detailOptions.forEach(detailOption => {
          detailOption.remove()
     });

     detailData.forEach(detail => {
          const newOption = document.createElement('option');
          newOption.value = detail.id;
          newOption.innerText = detail.label;
          newOption.className = 'detail-option';

          detailsDropdown.append(newOption);
     });
}


// GET details data
async function getUrbanAreaDetails(urbanArea, section, category = false) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/details/`;
     try {
          const response = await axios.get(url);
          data = response.data.categories;
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
     newPopulation.innerText = `POPULATION: ${population} million`;

     const newPopulationDensity = document.createElement('li');
     newPopulationDensity.className = 'population-density summary-detail summary-list-item';
     newPopulationDensity.innerText = `POPULATION DENSITY: ${populationDensity} ppl / sq.km`;

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
async function getTotalCityCount(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/cities/`;
     try {
          const response = await axios.get(url);
          data = response.data.count;
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
     newCityCount.innerText = `TOTAL CITIES: ${cityCount}`;

     summaryParentDiv.append(newCityCount);
}


// GET images 
async function getImages(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/images/`;
     try {
          const response = await axios.get(url);
          data = response.data.photos[0].image;
          return putImages(data);
     } catch (error) {
          console.log('Error', error);
     }
};

const putImages = (imageData) => {
     const imgDiv = document.querySelector('.image-div');

     const newMobileImage = document.createElement('img');
     newMobileImage.src = imageData.mobile;
     newMobileImage.alt = 'city image';
     newMobileImage.className = 'mobile-image summary-detail'

     imgDiv.append(newMobileImage);
}


// ********************************** COMPARE SECTION **********************************
// ********************************** COMPARE SECTION **********************************
// ********************************** COMPARE SECTION **********************************
// ********************************** COMPARE SECTION **********************************
// ********************************** COMPARE SECTION **********************************
// ********************************** COMPARE SECTION **********************************
// ********************************** COMPARE SECTION **********************************
// ********************************** COMPARE SECTION **********************************

// TOGGLE ON the cities component - COMPARE
const toggleOnSection1Compare = () => {
     const noShowers = document.querySelectorAll('.no-show-1-compare')

     if (noShowers) {
          noShowers.forEach(noShower => {
               noShower.classList.toggle('no-show-1-compare');
          });
     }
}

// GET selection from Continent Dropdown on Updated button - COMPARE
const submitContinentButtonCompare = document.querySelector('#update-city-list-compare');
submitContinentButtonCompare.addEventListener('click', (e) => {
     e.preventDefault();

     toggleOnSection1Compare();

     const options = document.querySelectorAll('#city-compare option');
     options.forEach(option => {
          option.remove();
     });

     const submittedContinent = document.querySelector('#continents-compare').value
     getUrbanAreaListCompare(submittedContinent);
});


// REMOVE summary details for each new submit
const removeSummaryDetailsCompare = () => {
     const summaryDetails = document.querySelectorAll('.summary-detail-compare');
     summaryDetails.forEach(summaryDetail => {
          summaryDetail.remove();
     });
};


// REMOVE progress bars for each new submit
const removeProgressBarsCompare = () => {
     const progressBars = document.querySelectorAll('.progress-bar-compare');
     progressBars.forEach(progressBar => {
          progressBar.remove();
     });
};


// REMOVE details li's from the bottom
const removeDetailsCompare = () => {
     const details = document.querySelectorAll('.detail-output-compare');
     details.forEach(detail => {
          detail.remove();
     });
}


// TOGGLE ON the components that aren't showing
const toggleOnSectionsCompare = () => {
     const noShowers = document.querySelectorAll('.no-show-compare')

     if (noShowers) {
          noShowers.forEach(noShower => {
               noShower.classList.toggle('no-show-compare');
          });
     }
}


// FUNCTION - compare div heights and make even to max
// const setSummaryDivHeight = () => {
//      const summaryDiv
// }


// GET Selected City as input for the Summary section
const submitCityButtonCompare = document.querySelector('#submit-city-compare');
submitCityButtonCompare.addEventListener('click', (e) => {
     e.preventDefault();

     toggleOnSectionsCompare();

     removeSummaryDetailsCompare();
     removeProgressBarsCompare();
     removeDetailsCompare();

     let city = document.querySelector('#city-compare').value;
     city = city.replace(/ /g, '-');
     city = city.replace(/[,.]/g, '');
     city = city.toLowerCase();

     getImagesCompare(city);
     getUrbanAreaBasicCompare(city);
     getUrbanAreaScoresCompare(city);
     getUrbanAreaDetailsCompare(city, 'summary');
     getTotalCityCountCompare(city);

     // function to resize all of the divs

});


// GET details section selection
const submitDetailButtonCompare = document.querySelector('#submit-detail-compare');
submitDetailButtonCompare.addEventListener('click', (e) => {
     e.preventDefault();

     removeDetailsCompare();

     let city = document.querySelector('#city-compare').value;
     city = city.replace(/ /g, '-');
     city = city.toLowerCase();

     const category = document.querySelector('#detail-categories-compare').value;

     getUrbanAreaDetailsCompare(city, 'details', category);
})


// GET Urban Areas List based on Continent dropdown - COMPARE
async function getUrbanAreaListCompare(continent) {
     if (continent === 'all') {
          try {
               const allUrl = 'https://api.teleport.org/api/urban_areas';
               const response = await axios.get(allUrl);
               data = response.data._links['ua:item'];
               return addListToCityDropdownCompare(data)
          } catch (error) {
               console.log('Error', error);
          };
     } else {
          try {
               const continetUrl = `https://api.teleport.org/api/continents/geonames%3A${continent}/urban_areas`;
               const response = await axios.get(continetUrl);
               data = response.data._links['ua:items'];
               return addListToCityDropdownCompare(data)
          } catch (error) {
               console.log(error);
          };
     };
};


// PUT Urban Area List in the City Dropdown
function addListToCityDropdownCompare(list) {
     const cityDropdown = document.querySelector('#city-compare');
     const newOptionDefault = document.createElement('option');
     newOptionDefault.innerText = 'Select City';
     cityDropdown.append(newOptionDefault);

     list.forEach(listElement => {
          const cityDropdown = document.querySelector('#city-compare');

          const newOption = document.createElement('option');
          newOption.value = listElement.name;
          newOption.innerText = listElement.name;

          cityDropdown.append(newOption);
     });
};


// GET basic data
async function getUrbanAreaBasicCompare(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/`;
     try {
          const response = await axios.get(url);
          data = response.data;
          return putFullNameCompare(data);
     } catch (error) {
          console.log('Error', error);
     }
};

// PARSE urban area basic data
// for summary area - Full Name
const putFullNameCompare = (basicData) => {
     const fullNameSummaryDiv = document.querySelector('.summary-header-div-compare');

     const newFullName = document.createElement('h3');
     newFullName.className = 'full-name-compare summary-detail-compare';
     newFullName.innerText = basicData.full_name.toUpperCase();

     fullNameSummaryDiv.append(newFullName);
}


// GET scores data
async function getUrbanAreaScoresCompare(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/scores/`;
     try {
          const response = await axios.get(url);
          data = response.data;

          return putQolScoreAndSummaryCompare(data),
               putScoresCompare(data);
     } catch (error) {
          console.log('Error', error);
     }
};


// PARSE urban area scores data
// for summary area - QOL Score, Summary
const putQolScoreAndSummaryCompare = (scoreData) => {

     const summaryDiv = document.querySelector('.summary-div-compare');
     summaryDiv.innerHTML = scoreData.summary;

     const summaryPs = document.querySelectorAll('.summary-div-compare p');
     summaryPs.forEach(summaryP => {
          summaryP.className = 'city-summary-compare summary-detail-compare';
     });

     const summaryList = document.querySelector('.summary-list-compare');

     const newQol = document.createElement('li');
     newQol.className = 'qol-score-compare summary-detail-compare summary-list-item-compare';
     newQol.innerText = `TOTAL QUALITY OF LIFE SCORE: ${Math.round(scoreData.teleport_city_score)}`;

     summaryList.append(newQol);
}


// PARSE urban areas scores data 
// for scores area
const putScoresCompare = (scoreData) => {
     let i = 0;
     const leftProgressBar = document.querySelector('.left-progress-bars-compare');
     const rightProgressBar = document.querySelector('.right-progress-bars-compare');
     scoreData.categories.forEach(score => {

          const newProgressBar = document.createElement('div');
          newProgressBar.className = 'progress-bar-compare';

          const newCategoryName = document.createElement('p');
          newCategoryName.className = 'qol-category-compare';
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
const putDetailsDropdownCompare = (detailData) => {
     const detailsDropdown = document.querySelector('#detail-categories-compare');

     const detailOptions = document.querySelectorAll('.detail-option-compare');

     detailOptions.forEach(detailOption => {
          detailOption.remove()
     });

     detailData.forEach(detail => {
          const newOption = document.createElement('option');
          newOption.value = detail.id;
          newOption.innerText = detail.label;
          newOption.className = 'detail-option-compare';

          detailsDropdown.append(newOption);
     });
}


// GET details data
async function getUrbanAreaDetailsCompare(urbanArea, section, category = false) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/details/`;
     try {
          const response = await axios.get(url);
          data = response.data.categories;
          if (section === 'summary') {
               return putPopulationCompare(data),
                    putDetailsDropdownCompare(data);
          } else {
               return putCategoryDetailsCompare(data, category);
          }
     } catch (error) {
          console.log('Error', error);
     }
};

// PARSE urban area details data
// for summary area - Population 
const putPopulationCompare = (detailData) => {
     const summaryList = document.querySelector('.summary-list-compare');

     const population = detailData[1].data[0].float_value.toFixed(2);
     const populationDensity = detailData[1].data[2].float_value.toFixed(1);

     const newPopulation = document.createElement('li');
     newPopulation.className = 'population-compare summary-detail-compare summary-list-item-compare';
     newPopulation.innerText = `POPULATION: ${population} million`;

     const newPopulationDensity = document.createElement('li');
     newPopulationDensity.className = 'population-density-compare summary-detail-compare summary-list-item-compare';
     newPopulationDensity.innerText = `POPULATION DENSITY: ${populationDensity} ppl / sq.km`;

     summaryList.append(newPopulation);
     summaryList.append(newPopulationDensity);
}


// PARSE urban area details data
// for details area
const putCategoryDetailsCompare = (detailData, category) => {
     const detailsUl = document.querySelector('.details-ul-compare');
     detailData.forEach(detail => {
          if (detail.id === category) {
               detail.data.forEach(detailStat => {
                    const newStatLi = document.createElement('li')
                    newStatLi.className = 'detail-output-compare';

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
async function getTotalCityCountCompare(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/cities/`;
     try {
          const response = await axios.get(url);
          data = response.data.count;
          return putCitiesCountCompare(data);
     } catch (error) {
          console.log('Error', error);
     }
};

// PARSE urban area cities
// for summary area - total city count 
const putCitiesCountCompare = (urbanCitiesData) => {
     const summaryParentDiv = document.querySelector('.summary-list-compare');

     const cityCount = urbanCitiesData;

     const newCityCount = document.createElement('li');
     newCityCount.className = 'city-count-compare summary-detail-compare summary-list-item-compare';
     newCityCount.innerText = `TOTAL CITIES: ${cityCount}`;

     summaryParentDiv.append(newCityCount);
}

// GET images 
async function getImagesCompare(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/images/`;
     try {
          const response = await axios.get(url);
          data = response.data.photos[0].image;
          return putImagesCompare(data);
     } catch (error) {
          console.log('Error', error);
     }
};

const putImagesCompare = (imageData) => {
     const imgDiv = document.querySelector('.image-div-compare');

     const newMobileImage = document.createElement('img');
     newMobileImage.src = imageData.mobile;
     newMobileImage.alt = 'city image';
     newMobileImage.className = 'mobile-image-compare summary-detail-compare'
     imgDiv.append(newMobileImage);
}


// GET HEIGHT OF A SECTION ?????

const summary = document.querySelector('.summary');
console.log(1)
console.log(summary.clientHeight);