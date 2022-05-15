(() => {
    const Utils = {
        server:{
            serverUrl: "https://pokeapi.co/api/v2"
        },
        getServerUrl: ({ searchType, query }) => {
            return `${Utils.server.serverUrl}/${searchType}/${query}`;
        },
        getServerSearch: ({ searchType, query}) => {
            return Utils.fetch({url: Utils.getServerUrl({ searchType, query }),searchType});
        },
        fetch: async ({ url, searchType }) => {
            try {
              const rawResponse = await fetch(url)
              if (rawResponse.status !== 200) {throw new Error(`${searchType} not found`)}
              return rawResponse.json();
            } catch (error) {
              throw error
            }
        },
        getPokemonEvolution: async (url) => {
            const rawResponse = await fetch(url)
            return rawResponse.json();
        },
        getEvolutionChain: async (pokeSpecieUrl) => {
            const responseEvo = await Utils.getPokemonEvolution(pokeSpecieUrl)
            const responsePokeEvo  = await Utils.getPokemonEvolution(responseEvo.evolution_chain.url)
            const evolutionChain = responsePokeEvo.chain
            return Utils.formatChain(evolutionChain)
        },
        formatChain: (evolutionChain, result = []) => {
            result.push({name: evolutionChain.species.name, is_baby: evolutionChain.is_baby})
            if (evolutionChain.evolves_to.length > 0) {
                for(i of evolutionChain.evolves_to ){
                    Utils.formatChain(i, result);
                }
            }
            return result
        }
    }
    document.Utils = Utils
})()