((Utils) => {
    const App = {
        htmmlElements: {
            pokeForm: document.querySelector("#poke-form"),
            pokeSearch: document.querySelector("#poke-search"),
            pokeSprites: document.querySelector("#sprites-check"),
            pokeLocation: document.querySelector("#location-check"),
            pokeChain: document.querySelector("#chain-check"),
            pokeOutput: document.querySelector("#response-pokemon"),
        },
        init: () => {
            App.htmmlElements.pokeForm.addEventListener("submit",App.handlers.getPokemonFormSubmit)
            App.htmmlElements.pokeOutput.style.display = 'none'
        },
        handlers: {
            getPokemonFormSubmit: async (e) => {
                e.preventDefault()

                App.htmmlElements.pokeOutput.style.display = ''

                const query = App.htmmlElements.pokeSearch.value.toLowerCase();
                const responsePoke = await Utils.getPokemon(query);
                const sprites = App.htmmlElements.pokeSprites
                const location = App.htmmlElements.pokeLocation
                const chain = App.htmmlElements.pokeChain

                const searchType = "name"

                const locationResponse = await Utils.getLocation(responsePoke.data.id)

                render = App.templates.renderTemplate({ searchType, responsePoke })
                App.htmmlElements.pokeOutput.innerHTML = await render
                
                if(sprites.checked){
                    const searchType = "pokemon"
                    render = App.templates.renderTemplate({ searchType, responsePoke })
                    App.htmmlElements.pokeOutput.innerHTML = await render
                }
                
                if(location.checked ){
                    cardLocation = App.templates.locationCard(locationResponse)
                    App.htmmlElements.pokeOutput.innerHTML = await cardLocation
                }

                chain.checked ? console.log("activado") : console.log("desactivado")

            }
        },
        templates: {
            renderTemplate: ({ searchType, responsePoke}) => {
                const renderType = {
                    pokemon: App.templates.pokemonCard,
                    name: App.templates.nameCard
                }
                return renderType[searchType] ? renderType[searchType](responsePoke) : "ERROR"  
            },
            nameCard: ({ data }) => {
                return `
                    <div class="item">
                        <h1>${data.name}</h1>
                        <h3> Altura: ${data.height} pies, Ancho: ${data.weight} pies</h3>
                    </div> `
                    
            },    
            pokemonCard: async ({ data }) => {
                return `
                    <div class="item">
                        <img class="poke-img" src="${data.sprites.front_default}">
                    </div>`
            },
            locationCard: ({ data }) => {
                for(let i = 0; i < data.length; i++) {
                    var tr = `<tr>
                            <td>`+data[i].location_area.name+`</td>
                            <td>`+data[i].location_area.url+`</td>
                        </tr>`
                    console.log(data[i].location_area);
                }
                return `
                <table class="table">
                    <tr>
                        <td>Lugar</td>
                        <td>Url</td>
                    </tr>
                    ${tr}
                </table>`
                
            }
        }
    }
    App.init()
})(document.Utils)