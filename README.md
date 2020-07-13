# Project Overview

# CityScore

## Project Description

A game to determine how well you know a city based on Teleport's quality of life data.   

or

A 1 page site to lookup and retreive a city's quality of life data (and other basic stats) from Teleport's app. 

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

Mireframe: https://wireframe.cc/atSHeo

### MVP/PostMVP 

#### MVP 

- Create a game that is played once and doesn't keep score 
- Allow user to filter the random city provided (by country, continent, etc)
- Show scores as a percentage bar with CSS 

#### PostMVP  

- Use openbrewerydb api to add a brewery score
- Add more filters (stuff like population size)
- Make the game go for 10 cities and show a score and "report card"
- Allow users to pick what categories are a taken into the city's score

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|July 13| Project Approval | Incomplete
|July 13| Basic HTML (buid wireframe), CSS (base styling), JavaScript (import and play with data)  | Incomplete
|July 14| HTML and JavaScript complete | Incomplete
|July 15| Complete CSS (styled form, score section)  | Incomplete
|July 16| MVP - add more filters, game to 10, scorecard, category selector | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  Link this image in a similar manner to your wireframes

Inline-style: 
![alt text]("https://app.lucidchart.com/publicSegments/view/a8f61106-aeda-4c6a-96a8-850a1aab7a76/image.png")


## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
