require("dotenv").config();
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.DEVPORT || 3000;
const TTL = process.env.TTL || 5000;
const CACHE_POKE = {};
const CACHE_ENCOUNTERS = {};
const CACHE_SPECIES = {};
const CACHE_CHAIN = {};

app.use(cors());

app.post("/pokemon/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE_POKE[name]) {
        return res.json({ data: CACHE_POKE[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE_POKE[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE_POKE[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});

app.post("/encounters/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE_ENCOUNTERS[name]) {
        return res.json({ data: CACHE_ENCOUNTERS[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE_ENCOUNTERS[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE_ENCOUNTERS[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});


app.post("/species/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE_SPECIES[name]) {
        return res.json({ data: CACHE_SPECIES[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${name}/`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE_SPECIES[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE_SPECIES[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});

app.post("/poekechain/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE_CHAIN[name]) {
        return res.json({ data: CACHE_CHAIN[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/evolution-chain/${name}/`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE_CHAIN[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE_CHAIN[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});

app.listen(PORT, () => {
    console.log(`El servidor está ejecutando en el puerto ${PORT}.`);
});
