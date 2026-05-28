const express = require("express");
const axios = require("axios");

const app = express();

const PLAYER = "BlackElm-1596";

function formatRank(roleData) {
    if (!roleData) return "Unranked";

    return `${roleData.division} ${roleData.tier}`;
}

app.get("/rank", async (req, res) => {
    try {
        const response = await axios.get(
            `https://overfast-api.tekrop.fr/players/${PLAYER}/summary`
        );

        const comp = response.data.competitive.pc;

        const tank = formatRank(comp.tank);
        const dps = formatRank(comp.damage);
        const support = formatRank(comp.support);

        res.send(
            `Tank: ${tank} | DPS: ${dps} | Suporte: ${support}`
        );

    } catch (error) {
        console.error(error);

        res.send("Erro ao buscar rank.");
    }
});

app.listen(3000, () => {
    console.log("API rodando");
});