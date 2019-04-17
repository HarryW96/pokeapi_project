const app = document.getElementById('root')

// const logo = document.createElement('img')
// logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

// app.appendChild(logo)
app.appendChild(container)

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://pokeapi.co/api/v2/pokemon', true)

request.onload = function () {
    var data = JSON.parse(this.response)

    console.log(data)

    if (request.status >= 200 && request.status < 400) {
        data.results.forEach(pokemon => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = pokemon.name

            container.appendChild(card)

            card.appendChild(h1)
            // console.log(pokemon.name)
            // console.log(pokemon.url)

            var detailrequest = new XMLHttpRequest()

            detailrequest.open('GET', pokemon.url, true)

            detailrequest.onload = function(){
                var detaildata = JSON.parse(this.response)

                for (let i = 0; i < detaildata.types.length; i++) {
                    const p = document.createElement('p')

                    p.setAttribute('class', 'type' + i)
                    p.textContent = 'Type ' + i + ': ' + detaildata.types[i].type.name

                    card.appendChild(p)
                }
                console.log(detaildata.types[0].type.name)
                // console.log(detaildata.base_experience)
                // detaildata.types.foreach(pokedetail => {
                //     // console.log(pokedetail.type.name)
                // })
   
            }
            detailrequest.send()
        })
    } else {
        console.log('this aint it son')
    }
}

request.send()