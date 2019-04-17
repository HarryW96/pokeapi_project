function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const app = document.getElementById('root')

const logo = document.createElement('img')
logo.setAttribute('class', 'logo')
logo.src = 'logo.png'

const desc = document.createElement('h2')
desc.textContent = 'A project by Harry to try and learn more about reactive web apps using restful apis'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(desc)
app.appendChild(container)

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=150', true)

request.onload = function () {
    var data = JSON.parse(this.response)

    console.log(data)

    if (request.status >= 200 && request.status < 400) {
        data.results.forEach(pokemon => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = jsUcfirst(pokemon.name)

            container.appendChild(card)

            card.appendChild(h1)

            var detailrequest = new XMLHttpRequest()

            detailrequest.open('GET', pokemon.url, true)
    
            detailrequest.onload = function(){

                var detaildata = JSON.parse(this.response)

                const img = document.createElement('img')
                
                img.setAttribute('class', 'pokemon_image')
                img.src = detaildata.sprites.front_default

                card.appendChild(img)

                for (let i = 0; i < detaildata.types.length; i++) {
                    const p = document.createElement('p')

                    p.setAttribute('class', 'type' + i)
                    p.textContent = 'Type ' + i + ': ' + jsUcfirst(detaildata.types[i].type.name)

                    card.appendChild(p)
                }
            }
            detailrequest.send()
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

request.send()