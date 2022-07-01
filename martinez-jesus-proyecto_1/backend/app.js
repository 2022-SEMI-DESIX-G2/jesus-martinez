require("dotenv").config();
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.DEVPORT || 3000;
const TTL = process.env.TTL || 0;
const CACHE = {};

app.use(cors());

app.post("/pokemon/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE[name]) {
        return res.json({ data: CACHE[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});

app.post("/encounters/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE[name]) {
        return res.json({ data: CACHE[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});


app.post("/species/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE[name]) {
        return res.json({ data: CACHE[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${name}/`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});

app.post("/poekechain/:name", async function (req, res) {
    const { name } = req.params;
    let responseData; 
    if (CACHE[name]) {
        return res.json({ data: CACHE[name], isCached: true, ttl: true});
    }
    try {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/evolution-chain/${name}/`
        );
        responseData = data;
    } catch (error) {
        responseData = { error: error.toString(), name };
    }
    CACHE[name] = responseData;
    cacheTime = setTimeout(() => { delete CACHE[name] }, TTL);
    res.send({ data: responseData, isCached: false, ttl: false });
});

app.listen(PORT, () => {
    console.log(`El servidor está ejecutando en el puerto ${PORT}.`);
});
