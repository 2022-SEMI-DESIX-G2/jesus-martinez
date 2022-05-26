const axios = require('axios').default;

async function getPokemon() {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
        pokemonName = data.name
        pokemonId = data.id
        pokemonW =  data.weight
        pokemonH = data.height

        const pokeAbilities = data.abilities.map(({ ability, is_hidden }) => `nombre: ${ability.name}  Vista: ${is_hidden}` )

        console.log("Nombre: ", pokemonName)
        console.log("ID: ", pokemonId)
        console.log("Peso: ", pokemonW)
        console.log("Altura: ", pokemonH)
        console.log("Habilidades: ", pokeAbilities)
    } catch (error) {
        console.error(error);
    }
}

getPokemon()