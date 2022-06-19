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
        getPokemonEvolution: async (name) => {
            const rawResponse = await fetch(url)
            return rawResponse.json();
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
        }
    }    
    document.Utils = Utils
})()