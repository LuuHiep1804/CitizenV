import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import person from './routers/person.js';
import province from './routers/province.js';
import district from './routers/district.js';
import ward from './routers/ward.js';
import residential_group from './routers/Rgroup.js';
import * as path from 'path';
import account from './routers/account.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.DATABASE_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.get('/', (req, res) => {
    const __dirname = path.resolve();
    const pathToFile = path.join(__dirname + '/home.html');
    res.sendFile(pathToFile);
})

app.use('/api/person/', person);

app.use('/api/province/', province);

app.use('/api/district/', district);

app.use('/api/ward/', ward);

app.use('/api/residential-group/', residential_group);

app.use('/api/login/', account);


mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    });
}).catch(err => {
    console.log('err', err);
})

