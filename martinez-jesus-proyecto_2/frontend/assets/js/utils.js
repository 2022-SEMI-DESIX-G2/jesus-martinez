(() => {
    const Utils = {
        server:{
            serverUrl: "http://127.0.0.1:3000/pokemon/"
        },
        getPokemon: async ( name ) => {
            let responseData
            try {
                const { data } = await axios.post(
                    `${Utils.server.serverUrl}${name}`
                );
                return responseData = data;
            } catch (error) {
                responseData = { error: error.toString(), name };
            }
        },
        getLocation: async (id) => {
            let responseData
            try {
                const { data } = await axios.post(
                    `http://127.0.0.1:3000/encounters/${id}`
                );
                return responseData = data;
            } catch (error) {
                responseData = { error: error.toString(), id };
            }
        },
        getSpecie: async (id) => {
            let responseData
            try {
                const { data } = await axios.post(
                    `http://127.0.0.1:3000/species/${id}`
                );
                responseData = data
                return responseData
            } catch (error) {
                responseData = { error: error.toString(), id };
            }
        },
        getEvolutionChain: async (id) => {
            let responseData
            try {
                const { data } = await axios.post(
                    `http://127.0.0.1:3000/species/${id}`
                );
                responseData = data
                const chainId = (responseData.data.evolution_chain.url).split("/")[6]
                const pokeChain =  await Utils.getEvolutionChainPerPkemon(chainId)
                return Utils.formatChain(pokeChain.data.chain)
            } catch (error) {
                responseData = { error: error.toString(), id };
            }
        },
        getEvolutionChainPerPkemon: async (id) => {
            let responseData
            try {
                const { data } = await axios.post(
                    `http://127.0.0.1:3000/poekechain/${id}`
                );
                responseData = data
                return responseData
            } catch (error) {
                responseData = { error: error.toString(), id };
            }
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