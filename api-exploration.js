async function getUrbanAreaList() {
     const url = 'https://api.teleport.org/api/urban_areas';
     try {
          const response = await axios.get(url);
          data = response.data._links['ua:item'];
          // console.log(data);
          return data
     } catch (error) {
          console.log(error);
     }
};

// console.log(getUrbanAreaList());


async function getUrbanAreaScores(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/scores/`;
     try {
          const response = await axios.get(url);
          data = response.data;
          // console.log(data);
          return data
     } catch (error) {
          console.log(error);
     }
};

const scores = getUrbanAreaScores('atlanta');
console.log(scores);

async function getUrbanAreaDetails(urbanArea) {
     const url = `https://api.teleport.org/api/urban_areas/slug:${urbanArea}/details/`;
     try {
          const response = await axios.get(url);
          data = response.data.categories;
          console.log(data);
          return createDetailsCategoryList(data),
               getCategoryDetails(data, 'Leisure & Culture');
     } catch (error) {
          console.log(error);
     }
};

getUrbanAreaDetails('tokyo');


function createDetailsCategoryList(detailsData) {
     const detailCategoryList = [];
     detailsData.forEach(detail => {
          detailCategoryList.push(detail.label)
          // console.log(detail.label);
     });
     // console.log(detailCategoryList);
}

function getCategoryDetails(details, category) {
     // const categoryDetails = details
     console.log(details);
     details.forEach(detail => {
          if (detail.label === category) {
               const detailData = detail.data;
               console.log(detailData)
               detailData.forEach(detailInfo => {
                    console.log(detailInfo.label);
               });
          };
     });
}

