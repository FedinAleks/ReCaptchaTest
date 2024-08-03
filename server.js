const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Налаштування для CORS
app.use(cors());

// Налаштування для обробки URL-кодованих даних
app.use(bodyParser.urlencoded({ extended: true }));

// Замініть 'ваш_секретний_ключ' на реальний секретний ключ
const secretKey = '6LdzRB0qAAAAAGQdrqjHzM6rtnl4wvoiSlhZXq7G';

// Endpoint для перевірки reCAPTCHA
app.post('/verify', async (req, res) => {
    const token = req.body.recaptcha_response;

    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: secretKey,
                response: token
            }
        });

        const result = response.data;
        if (result.success) {
            res.send('reCAPTCHA validation successful.');
        } else {
            res.send('reCAPTCHA validation failed.');
        }
    } catch (error) {
        res.status(500).send('Error verifying reCAPTCHA.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
