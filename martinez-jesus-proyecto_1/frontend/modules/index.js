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
                const sprites = App.htmmlElements.pokeSprites.checked
                const location = App.htmmlElements.pokeLocation.checked
                const chain = App.htmmlElements.pokeChain.checked

                try {
                    const query = App.htmmlElements.pokeSearch.value.toLowerCase();
                    const responsePoke = await Utils.getPokemon(query);

                    if(responsePoke.data.error){
                        render = App.templates.pokemonError()
                        App.htmmlElements.pokeOutput.innerHTML = await render
                    }else{
                        const locationResponse = await Utils.getLocation(responsePoke.data.id)
                        const evolutionChain = await Utils.getEvolutionChain(responsePoke.data.id)

                        render = App.templates.pokemonCard({ responsePoke, sprites, location, locationResponse, chain, evolutionChain })
                        App.htmmlElements.pokeOutput.innerHTML = await render
                    }
                } catch (error) {
                    console.log(error)
                }                
            }
        },
        templates: {
            pokemonCard: async ({ responsePoke, sprites, location, locationResponse, chain, evolutionChain }) => {
                const { data } = responsePoke
                if(sprites){
                    var spritesTemplate = `
                    <div class="item">
                        <img class="poke-img" src="${data.sprites.front_default}">
                    </div>
                    `
                }else var spritesTemplate = ``

                if(location){
                    for(let i = 0; i < locationResponse.data.length; i++) {
                        var tr = `<tr>
                                <td>`+locationResponse.data[i].location_area.name+`</td>
                                <td>`+locationResponse.data[i].location_area.url+`</td>
                            </tr>`
                        console.log(locationResponse.data[i].location_area);
                    }
                    var table = `
                        <div class="item">
                            <table class="table">
                                <tr>
                                    <th>Lugar</th>
                                    <th>Url</th>
                                </tr>
                                ${tr}
                            </table>
                        </div>
                    `
                }else table = ``

                if(chain){
                    const pokeEvolutionChain = evolutionChain.map(({ name,is_baby }) => `<li>${name} ${is_baby? '<img class="baby-img"src="img/baby.svg">':""} </li>`) 
                    var chainTemplate = `
                        <div class="item">
                            <h3>Evolution chain</h3>
                            <ul>${pokeEvolutionChain.join("")}</ul>
                        </div>
                    `
                }else chainTemplate = ``
                
                return `
                    <div class="item">
                        <h1>${data.name}</h1>
                        <h3> Altura: ${data.height} pies, Ancho: ${data.weight} pies</h3>
                    </div>
                    ${spritesTemplate}
                    ${table}
                    ${chainTemplate}
                    `
            },
            pokemonError: () => {
                return `
                <div class="item">
                    <img src="img/notfound.png">
                </div>
                `
            }
        }
    }
    App.init()
})(document.Utils)