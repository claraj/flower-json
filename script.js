
let container = document.querySelector('#flower-list')
let favoritesEl = document.querySelector('#favorites')

let likeImg = 'images/red-heart.png'
let notLikeImg = 'images/gray-heart.png'

flowers.forEach( flower => {
    let flowerElement = createFlowerInfo(flower);
    container.appendChild(flowerElement)
})

buildFavorites()

function createFlowerInfo(flower) {

    let container = document.createElement('div')
    container.classList.add('flower-info')

    let h2 = document.createElement('h2')
    h2.innerHTML = flower.name

    let h3description = document.createElement('h3')
    h3description.innerHTML = 'Description'
    
    let para1 = document.createElement('p')
    para1.innerHTML = flower.description 

    let h3habitat = document.createElement('h3')
    h3habitat.innerHTML = 'Habitat'
    
    let para2 = document.createElement('p')
    para2.innerHTML = flower.habitat 

    let link = document.createElement('a')
    link.href = flower.url 
    link.innerHTML = flower.url

    let imageContainer = document.createElement('div')
    flower.images.forEach( imageFile => {
        let img = document.createElement('img')
        img.src = imageFile
        img.classList.add('flower-image')
        imageContainer.appendChild(img)
    })


    let like = document.createElement('img')
    like.classList.add('like-button')

    if (flower.userLikes) {
        like.src = likeImg
    } else {
        like.src = notLikeImg
    }

    addLikeListener(like, flower.id)

    container.appendChild(h2)
    container.appendChild(h3description)
    container.appendChild(para1)
    container.appendChild(h3habitat)
    container.appendChild(para2)
    container.appendChild(link)
    container.appendChild(imageContainer)
    container.appendChild(like)

    return container
}


function addLikeListener(heartElement, id) {

    heartElement.addEventListener('click', function() {
        // find flower by id 
        // toggle userLikes 
        // toggle image in like 
        flower = flowers.filter( flower => flower.id == id)[0]
        if (!flower) { 
            console.log('no flower with id ', id); 
            return;
        }

        flower.userLikes = !flower.userLikes   // toggle 

        if (flower.userLikes) {
            this.src = likeImg
        } else {
            this.src = notLikeImg
        }

        buildFavorites()
    })
}


function buildFavorites() {

    let favorites = flowers
                        .filter( flower => flower.userLikes)
                        .map( flower => flower.name )

    
    let favoritesString = favorites.join(', ')
    
    if (favoritesString.length == 0) {
        favoritesEl.innerHTML = 'Favorites list here'
    } else {
        favoritesEl.innerHTML = favoritesString
    }
}