let yelpFetch = JSON.parse(localStorage.getItem('yelpFetch'))
let zomatoFetch = JSON.parse(localStorage.getItem('zomatoFetch'))

//if there is search result, show them
//if no search result within 10 km, show no result on the page
if (yelpFetch.total > 0){
    let col;
    yelpFetch.businesses.forEach(function(restaurant, index){
        const zomatoListing = retrieveZomatoListing(restaurant.name)
        if (index % 2 === 0) {
            col = document.createElement('div')
            col.classList.add('columns');
            col.appendChild(createDisplayCard(restaurant, zomatoListing))
        } else {
            col.appendChild(createDisplayCard(restaurant))
            document.getElementById('cards').appendChild(col)
        }
    })
}
else if (yelpFetch.total === 0) {
    document.getElementById("cards").innerHTML = "<h2>Sorry No search result</h2>"
    console.log(yelpFetch.total);
}

function createDisplayCard(restaurantObj, zomatoListing) {
    const restaurantContent = createCardContent(restaurantObj, zomatoListing)
    const restaurantFooter = createCardFooter(restaurantObj)
    const restaurantCard = createCard(restaurantContent, restaurantFooter)
    return restaurantCard
}

function createColumn() {
    const column = document.createElement('div')
    column.classList.add('column')
    return column
}

function createCard(content, footer) {
    const cardCol = createColumn()
    const card = document.createElement('div')
    card.classList.add('box')
    card.appendChild(content)
    card.appendChild(footer)
    cardCol.appendChild(card)
    return cardCol;
}

function createCardContent(restaurantObj, zomatoListing) {
    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content', 'columns', 'is-desktop')

    let timings = '';
    let highlights = ''
    if (zomatoListing) {
        timings = zomatoListing.timings
        zomatoListing.highlights.forEach(function(highlight, index) {
            highlights += highlight
            if (index < zomatoListing.highlights.length - 1) {
                highlights += ', '
            }
        })
    }

    const imageCol = createColumn()
    const imageWrap = document.createElement('figure');
    imageWrap.classList.add('image')
    imageWrap.innerHTML =
        `<img id='image' src="${restaurantObj.image_url}">`
    imageCol.appendChild(imageWrap);

    const contentCol = createColumn()
    const contentWrap = document.createElement('div')
    contentWrap.classList.add('content')
    contentWrap.innerHTML =
        `<p class="title is-4" id="name">${restaurantObj.name}</p>
        <p class="subtitle is-5" id="type">${restaurantObj.categories[0].title}</p>
        <p id='transaction'>${highlights}</p>
        <p class="subtitle" id='price'>${restaurantObj.price ? restaurantObj.price : ''}</p>
        <img class="mb-0" id="rating" src="./assets/images/large_${Math.floor(restaurantObj.rating)}.png" alt="${Math.floor(restaurantObj.rating)} stars">
        <a href="${restaurantObj.url}"><img src="./assets/images/yelp_trademark.png" alt="" style="max-width: 70px; height: auto;"></a>
        <p id="review">${restaurantObj.review_count} Reviews on Yelp</p>`
    contentCol.appendChild(contentWrap)

    const distanceCol = createColumn()
    distanceCol.classList.add('has-text-right-desktop')
    distanceCol.innerHTML =
        `<p class="subtitle is-5 mb-0" id='distance'>${(parseInt(restaurantObj.distance)/1000).toFixed(1)} km away from you</p>
        <p class="subtitle is-5" id='is-closed'>${restaurantObj.is_closed ? 'Closed' : 'Open'}</p>
        <p>${timings}</p>`

    cardContent.appendChild(imageCol)
    cardContent.appendChild(contentCol)
    cardContent.appendChild(distanceCol)
    return cardContent
}

function createCardFooter(restaurantObj) {
    const footer = document.createElement('footer')
    footer.classList.add('card-footer')

    if (restaurantObj.phone) {
        const phoneNumber = document.createElement('div')
        phoneNumber.classList.add('card-footer-item')
        phoneNumber.innerHTML =
        `<a href="tel:${restaurantObj.phone}"><i class="fas fa-phone mr-3"></i><span clas="icon" id="phone">${restaurantObj.display_phone}</span></a>`
        footer.appendChild(phoneNumber)
    }

    const directions = document.createElement('div')
    directions.classList.add('card-footer-item')
    directions.innerHTML =
        `<a href="https://www.google.com/maps/dir/?api=1&destination=${restaurantObj.name}"><span clas="icon"><i class="fas fa-directions mr-3"></i></span>Directions</a>`

    footer.appendChild(directions)
    return footer
}

function retrieveZomatoListing(restaurantName) {
    for (restaurant of zomatoFetch.restaurants) {
        if (restaurantName === restaurant.restaurant.name) {
            return restaurant.restaurant
        }
    }
    return null
}