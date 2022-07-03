((Utils) => {
    const App = {
        htmmlElements: {
            pokeForm: document.querySelector("#poke-form"),
            pokeSearch: document.querySelector("#poke-search"),
            pokeSprites: document.querySelector("#sprites-check"),
            pokeLocation: document.querySelector("#location-check"),
            pokeChain: document.querySelector("#chain-check"),
            pokeOutput: document.querySelector("#response-pokemon"),
            pokeOutputClass: document.querySelector("card-pokemon")
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

                    console.log("pke",responsePoke)

                    if(responsePoke.data.error){
                        render = App.templates.pokemonError()
                        App.htmmlElements.pokeOutput.innerHTML = await render
                    }else{
                        const locationResponse = await Utils.getLocation(responsePoke.data.id)
                        const evolutionChain = await Utils.getEvolutionChain(responsePoke.data.id)
                        const specie = await Utils.getSpecie(responsePoke.data.id)

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

                for(let i = 0; i < data.types.length; i++) {
                    var type = `
                        <span class="type">`+data.types[i].type.name+`</span>
                        `
                }


                if(sprites){
                    var spritesTemplate = `
                        <img class="img" src="${data.sprites.front_default}">
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
                        <div class="resume-title">Location</div>
                        <table class="location">
                            <tr>
                                <th>Name</th>
                                <th>Url</th>
                            </tr>
                            ${tr}
                        </table>
                    `
                }else table = ``

                if(chain){
                    const pokeEvolutionChain = evolutionChain.map(({ name,is_baby }) => `<li>${name} ${is_baby? '<img class="baby-img"src="img/baby.svg">':""} </li>`) 
                    var chainTemplate = `
                        <div class="resume-title">Evolution</div>
                            <ul>${pokeEvolutionChain.join("")}</ul>
                    `
                }else chainTemplate = ``
                
                return `
                    <h2>${data.name}</h2>
                    ${spritesTemplate}
                    <div class="card-resume">
                        ${type}
                        <div class="resume-title">About</div>
                        <div class="about-text">
                            <img class="peso" src="assets/img/peso.png"> ${data.weight} kg 
                            <span>|</span>
                            <img src="assets/img/regla.png"> ${data.height}m
                        </div>
                        ${table}
                        ${chainTemplate}
                    </div>
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