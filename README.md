# Project Overview

# CityScore

## Project Description

A 1 page site showing multiple data points for a particular city (or urban area). Data points include: quality of life, business freedom, climate, cost of living, culture, education, job market, tolerance, and much more. 

## API and Data Sample

API: https://api.teleport.org/api/cities/

```
"categories": [
        {
            "color": "#f3c32c",
            "name": "Housing",
            "score_out_of_10": 4.9755
        },
        {
            "color": "#f3d630",
            "name": "Cost of Living",
            "score_out_of_10": 5.241
        },
        {
            "color": "#f4eb33",
            "name": "Startups",
            "score_out_of_10": 8.835
        },
        {
            "color": "#d2ed31",
            "name": "Venture Capital",
            "score_out_of_10": 7.2570000000000014
        },
        {
            "color": "#7adc29",
            "name": "Travel Connectivity",
            "score_out_of_10": 5.2915
        },
        {
            "color": "#36cc24",
            "name": "Commute",
            "score_out_of_10": 3.8977500000000003
        },
        {
            "color": "#19ad51",
            "name": "Business Freedom",
            "score_out_of_10": 8.671
        },
        {
            "color": "#0d6999",
            "name": "Safety",
            "score_out_of_10": 2.6725
        },
        {
            "color": "#051fa5",
            "name": "Healthcare",
            "score_out_of_10": 6.0233333333333325
        },
        {
            "color": "#150e78",
            "name": "Education",
            "score_out_of_10": 6.456999999999999
        },
        {
            "color": "#3d14a4",
            "name": "Environmental Quality",
            "score_out_of_10": 5.817749999999999
        },
        {
            "color": "#5c14a1",
            "name": "Economy",
            "score_out_of_10": 6.5145
        },
        {
            "color": "#88149f",
            "name": "Taxation",
            "score_out_of_10": 4.204
        },
        {
            "color": "#b9117d",
            "name": "Internet Access",
            "score_out_of_10": 6.4805
        },
        {
            "color": "#d10d54",
            "name": "Leisure & Culture",
            "score_out_of_10": 7.765499999999999
        },
        {
            "color": "#e70c26",
            "name": "Tolerance",
            "score_out_of_10": 4.062
        },
        {
            "color": "#f1351b",
            "name": "Outdoors",
            "score_out_of_10": 5.0095
        }
    ],
    "summary": "<p>Atlanta, Georgia, is among the best cities with a <b>vibrant startup scene</b>.\n\n    \n        According to our city rankings, this is a good place to live with high ratings in <b>venture capital</b>, <b>business freedom</b> and <b>leisure & culture</b>.\n    \n\n    \n</p>\n\n\n    <p>Atlanta is one of the top ten city matches for 6.5% of Teleport users.</p>\n",
    "teleport_city_score": 56.001891891891894
}
```

## Wireframes

Wireframe: https://wireframe.cc/atSHeo

### MVP/PostMVP 

#### MVP 

- Give dropdown menu to show more details at the bottom of the main score area
- Add filter to select Country/Continent (make searching easier)
- Show scores as a percentage bar with CSS 

#### PostMVP  

- Use openbrewerydb api to add a brewery score
- Allow users to compare cities
- Allow users to pick what categories they want to see below the main score area and display all of them

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|July 13| Project Approval | Complete
|July 13| Basic HTML (buid wireframe), CSS (base styling), JavaScript (import and play with data)  | Complete
|July 14| HTML and JavaScript complete | Complete
|July 15| MVP - Complete CSS (styled form, score section)  | Complete
|July 16| Post - MVP  | Complete
|July 17| Presentations | Incomplete

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  Link this image in a similar manner to your wireframes
 
![alt text](https://app.lucidchart.com/publicSegments/view/a8f61106-aeda-4c6a-96a8-850a1aab7a76/image.png "Priority Matrix")


## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Base HTML | M | 2hrs | 1.5hrs | hrs | 
| Base CSS | M | 2hrs| 4hrs | hrs |
| Explore Data | M | 2hrs| 1.5hrs | hrs |
| JS - Summary/Score Sections | H | 4hrs | 2.5hrs | hrs |
| JS - Details Section | M | 2hrs| 2hrs | hrs |
| JS - Form | H | 3hrs| 2hrs | hrs |
| CSS - Summary/Score Sections | H | 4hrs| 3hrs | hrs |
| CSS - Details Section | M | 2hrs| 1hrs | hrs |
| CSS - Form | H | 3hrs| 1hrs | hrs |
| Category Selection | L | 4hrs| hrs | hrs |
| Add Brewdog | L | 3hrs| hrs | hrs |
| Add City Comparison | L | 8hrs | 5hrs | hrs |
| Debugging | n/a | n/a | 5hrs | hrs |
| Refactoring | n/a | n/a | 3hrs | hrs |
| Total | n/a | 37hrs| 29.5hrs | hrs |

## Code Snippet

This code doesn't look like much, but it took me a while to put together. It is how I toggle between the single and compare view. I'm proud of it because it took a lot of understanding to be able to put together. I had to understand what the beginning state of the site needed to be in terms of CSS tags that were attached to "display: none". Then I would toggle them on and off using both this function and the toggle class function. I hide different information and show it at different times, so I had to fight a lot of bugs when building this out. 

```
const compareButton = document.querySelector('.compare-button');
compareButton.addEventListener('click', (e) => {
     e.preventDefault();

     toggleClassList('.main-div', 'side-by-side');
     toggleClassList('.select-form', 'compare');
     toggleClassList('.summary', 'compare');
     toggleClassList('.score', 'compare');
     toggleClassList('.details', 'compare');
     toggleClassList('.salaries', 'compare');
     toggleClassList('.city-section-compare', 'no-show-compare-button');
     toggleClassList('.summary-compare', 'no-show-compare-button');
     toggleClassList('.score-compare', 'no-show-compare-button');
     toggleClassList('.details-compare', 'no-show-compare-button');
     toggleClassList('.select-form-compare', 'no-show-compare-button');
     toggleClassList('.salaries-compare', 'no-show-compare-button');

     const buttonText = document.querySelector('.compare-button').innerText;
     if (buttonText === 'Compare') {
          document.querySelector('.compare-button').innerText = 'Single'
     } else {
          document.querySelector('.compare-button').innerText = 'Compare'
     }
});
```
## Change Log

- only real change was that I decided to build out the compare view instead of adding other data, apis, or filters. 
- I also added a section on the bottom on Thursday to show salary ranges based on different titles. 