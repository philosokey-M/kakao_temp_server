const express = require('express');
const axios = require('axios');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());

apiRouter.use('/skill', require('./skill/hello'));
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});