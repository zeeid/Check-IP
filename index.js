const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const url = 'http://ip-api.com/json/'+clientIP;
    // res.send(`Terjadi kesalahan: ${url}`);
    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'success') {
            const ip = data.query;
            const country = data.country;
            const timezone = data.timezone;

            // res.send(`IP: ${ip}<br>Country: ${country}<br>Timezone: ${timezone}`);
            
            var test = `<p id="ipnya">${ip}</p>
            <p id="negaranya">${country}</p>
            <p id="timezonenya">${timezone}</p>`;
            res.send(test)
        } else {
            res.send(`Gagal mendapatkan IP: ${data.message}`);
        }
    } catch (error) {
        res.send(`Terjadi kesalahan: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
