((Utils) => {
    const App = {
        htmmlElements: {
            pokeForm: document.querySelector("#pokemon-form"),
            pokeInput: document.querySelector("#poke-inptut"),
            pokeSelect: document.querySelector("#poke-select"),
            pokeOutput: document.querySelector("#response-pokemon"),
            pokeClean: document.querySelector("#poke-clean")
        },
        init: () => {
            App.htmmlElements.pokeClean.style.display = 'none'
            App.htmmlElements.pokeForm.addEventListener("submit",App.handlers.getPokemonFormSubmit)
            App.htmmlElements.pokeClean.addEventListener("click",App.handlers.cleanPokemonCars)
        },
        handlers: {
            getPokemonFormSubmit: async (e) => {
                e.preventDefault()
                App.htmmlElements.pokeClean.style.display = ''
                const searchType = App.htmmlElements.pokeSelect.value
                const query = App.htmmlElements.pokeInput.value.toLowerCase();

                try{
                    const response = await Utils.getServerSearch({searchType,query})
                    const renderTemplate = App.templates.render({searchType, response})
                    App.htmmlElements.pokeOutput.innerHTML = await renderTemplate
                } catch(error){ console.log(error)}
            },
            cleanPokemonCars: () => {
                App.htmmlElements.pokeOutput.innerHTML =""
                App.htmmlElements.pokeClean.style.display = 'none'
            }
        },
        templates: {
            render: ({ searchType, response}) => {
                const renderType = {
                    pokemon: App.templates.pokemonCard,
                    ability: App.templates.abilityCard
                }
                return renderType[searchType] ? renderType[searchType](response) : "ERROR"   
            },
            pokemonCard: async ({ name, id, sprites, weight, height, abilities, species }) => {
                
                const pokeAbilities = abilities.map(({ ability, is_hidden }) => `<li>${ability.name} ${is_hidden? '<img class="eye-img"src="img/eye.svg">':""}</li>`)
                const evolutionChain = await Utils.getEvolutionChain(species.url)
                const pokeEvolutionChain = evolutionChain.map(({ name,is_baby }) => `<li>${name} ${is_baby? '<img class="baby-img"src="img/baby.svg">':""} </li>`) 

                return ` <h1 class="poke-title">${name} (${id})</h1>
                <div class="flex-container">
                    <div class="item">
                        <h3>Sprites</h3>
                        <img class="poke-img" src="${sprites.front_default}">
                        <img class="poke-img-r" src="${sprites.back_default}">
                    </div>
                    <div class="item">
                        <h3>Weight / Height</h3>
                        <h4>${weight} / ${height}</h4>
                    </div>
                    <div class="item">
                        <h3>Evolution chain</h3>
                        <ul>${pokeEvolutionChain.join("")}</ul>
                    </div>
                    <div class="item">
                        <h3>Abilities</h3>
                        <ul>${pokeAbilities.join("")}</ul>
                    </div>
                </div>`
            },
            abilityCard: async ({ pokemon, name }) => {
                const response = pokemon.map(({ pokemon, is_hidden }) => `<li>${pokemon.name} ${is_hidden? '<img class="eye-img"src="img/eye.svg">':""} </li>`) 
                return ` <h1 class="poke-title">${name}</h1>
                <div class="item">
                    <h3>Who can learn it?</h3>
                    <ul>${response.join("")}</ul>
                </div>` 
            },
            errorCard: () => {
                return ` <h1 class="poke-title">Error</h1>`
            }
        }
    }
    App.init()
})(document.Utils)