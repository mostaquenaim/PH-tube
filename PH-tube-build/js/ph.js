
const catId = "1000"
let sort_id = catId

const handleLoadCards = async (categoryId) => {

    sort_id = categoryId

    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );

    const cats = await res.json();
    const categoryContainer = document.getElementById("categories");

    categoryContainer.innerHTML = ''

    let isSlice = '';

    // if (true) {
    isSlice = cats.data;
    // }
    // else {
    //     isslice = data.data.news_category.slice(0, 3);
    // }

    isSlice.forEach((category) => {
        const div = document.createElement("div");
        category.category_id === categoryId ?
            div.innerHTML = `
          <button class="btn bg-red-500 text-white" onclick="handleLoadCards('${category.category_id}')" class="tab">${category?.category}</button>
          `
            :
            div.innerHTML = `
          <button class="btn" onclick="handleLoadCards('${category.category_id}')" class="tab">${category?.category}</button>
          `
        categoryContainer.appendChild(div);
    });


    console.log(categoryId);

    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );

    const data = await response.json();


    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const bodyContainer = document.getElementById("body-container")
    bodyContainer.innerHTML = "";

    if (data.data[0]) {

        data.data?.forEach((cards) => {
            console.log(cards);

            const time = cards.others.posted_date;

            const min = parseInt(parseInt(time) / 60) % 60;
            const hour = parseInt(parseInt(time) / 3600) ;
            // const day = parseInt(parseInt(time) / 86400);

            const ifVerified = cards.authors[0].verified

            console.log(ifVerified)


            console.log({ hour, min })


            const div = document.createElement("div");
            div.innerHTML = `
      <div class="card bg-base-100">
      <figure class="rounded-lg">
          <img class="rounded-lg h-48 w-full" src=${cards.thumbnail} alt="image" />
      </figure>

      <div class="card-body relative">
      ${(hour || min)
                    ? `<p class="absolute -top-16 right-10 p-2 bg-gray-700 text-white rounded-lg opacity-80">

          
            
                  ${hour
                        ? `${hour}hrs`
                        : ''
                    }

                  ${min
                        ? `${min} min`
                        : ''
                    }
                  ago
               </p>`
                    : ''
                }
          
          <div class="flex gap-3">
              <img class="rounded-full h-10 w-10" src=${cards.authors[0].profile_picture} alt="author image">
              <div>
                  <h2 class="card-title">
                  ${cards.title}
                  </h2>
                  <div class="flex gap-2">
                      <span class="opacity-70">
                      ${cards.authors[0].profile_name}
                      </span>
                      
                      ${ifVerified ?
                    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_11_215)">
                              <path
                                  d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z"
                                  fill="#2568EF" />
                              <path
                                  d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z"
                                  fill="#FFFCEE" />
                          </g>
                          <defs>
                              <clipPath id="clip0_11_215">
                                  <rect width="20" height="20" fill="white" />
                              </clipPath>
                          </defs>
                      </svg>`
                    : ''
                }
                      
                  </div>
                  <p class="opacity-70">
                      ${cards.others.views} views
                  </p>

              </div>

          </div>
      </div>
  </div>
      `;

            cardContainer.appendChild(div);
        })
    }
    else {
        bodyContainer.innerHTML = `
    <div class="flex flex-col justify-center items-center text-center h-full gap-3">
        <img src="images/Icon.png" alt="icon">
        <p class="font-bold text-4xl">
            Oops!! Sorry, There is no <br>
            content here
        </p>
    </div>
    `
    }






};

const handleSorting = async () => {

    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${sort_id}`
    );

    const data = await response.json();

    if (data.data[0]) {

    const info = data.data;

    console.log(info)

    const tempArr = []



    for (const item of info) {
        // console.log(item.category_id)
        const viewCount = parseFloat(item.others.views);
        tempArr.push(viewCount);
    }

    tempArr.sort((a, b) => a - b);
    tempArr.reverse();
    console.log(tempArr)
    

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const bodyContainer = document.getElementById("body-container")
    bodyContainer.innerHTML = "";

    //for getting unique
    const sortedData = [];

    tempArr?.forEach((view) => {

        const matchingData = info.find((item) => {
            const condition1 = parseFloat(item.others.views) === view;
            const condition2 = !sortedData.some((sortedItem) => sortedItem.title === item.title); //check kora hocche ei object age use newa hoise kina
            return condition1 && condition2;
        });
    
        // If matchingData is found, add it to sortedData
        if (matchingData) {
            sortedData.push(matchingData);
        }
    
        

        console.log("matchingData", matchingData)


        const time = matchingData.others.posted_date;

        const min = parseInt(parseInt(time) / 60) % 60;
        const hour = parseInt(parseInt(time) / 3600) ;

        const ifVerified = matchingData.authors[0].verified

        console.log(ifVerified)


        console.log({ hour, min })


        const div = document.createElement("div");
        div.innerHTML = `
          <div class="card bg-base-100">
          <figure class="rounded-lg">
              <img class="rounded-lg h-48 w-full" src=${matchingData.thumbnail} alt="image" />
          </figure>
    
          <div class="card-body relative">
          ${(hour || min)
                ? `<p class="absolute -top-16 right-10 p-2 bg-gray-700 text-white rounded-lg opacity-80">
    
               
                      ${hour
                    ? `${hour}hrs`
                    : ''
                }
    
                      ${min
                    ? `${min} min`
                    : ''
                }
                      ago
                   </p>`
                : ''
            }
              
              <div class="flex gap-3">
                  <img class="rounded-full h-10 w-10" src=${matchingData.authors[0].profile_picture} alt="author image">
                  <div>
                      <h2 class="card-title">
                      ${matchingData.title}
                      </h2>
                      <div class="flex gap-2">
                          <span class="opacity-70">
                          ${matchingData.authors[0].profile_name}
                          </span>
                          
                          ${ifVerified ?
                `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_11_215)">
                                  <path
                                      d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z"
                                      fill="#2568EF" />
                                  <path
                                      d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z"
                                      fill="#FFFCEE" />
                              </g>
                              <defs>
                                  <clipPath id="clip0_11_215">
                                      <rect width="20" height="20" fill="white" />
                                  </clipPath>
                              </defs>
                          </svg>`
                : ''
            }
                          
                      </div>
                      <p class="opacity-70">
                          ${matchingData.others.views} views
                      </p>
    
                  </div>
    
              </div>
          </div>
      </div>
          `;

        cardContainer.appendChild(div);



    })

}

               
    else {
    bodyContainer.innerHTML = `
    <div class="flex flex-col justify-center items-center text-center h-full gap-3">
        <img src="images/Icon.png" alt="icon">
        <p class="font-bold text-4xl">
            Oops!! Sorry, There is no <br>
            content here
        </p>
    </div>
    `
}



};

handleLoadCards(catId)

