import express from 'express';
import { engine, create } from 'express-handlebars';
import morgan from 'morgan';

import path from 'path';
import { fileURLToPath } from 'url';
import route from './routes/index.js';
import connect from './M/db/db.js';
import MethodOverrideOptions from 'method-override';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;
const db = connect;
// Override Method
app.use(MethodOverrideOptions('_method'));
// Connect to DB
db.connect();
// Log terminal

// Regis helpers
app.use(morgan('combined'));
const hbs = create({
    extname: '.hbs',
    helpers: {
        sum(a, b) {
            return a + b;
        },
    },
});

// Path
app.use(express.static(path.join(__dirname, 'public/')));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resouces/V'));

// Connect to Route process
route(app);

app.listen(port, () => {
    console.log(`Listening in http://localhost:${port}`);
});
