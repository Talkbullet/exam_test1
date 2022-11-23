import express from 'express';
import cors from 'cors';
import { openDBConnection, getCon } from './dbConnection.js';
import { authorization } from './auth.js';

import { foodsAPI } from '../APIs/foods.js';
import { reservationsAPI } from '../APIs/reservations.js';
import { userValidationAPI } from '../APIs/userValidation.js';

const server = {};

server.start = () =>{

    const app = express();
    const port = 3007;

    app.use(express.json({ limit: "50mb" })); //use if storing images

    app.use(cors());

    app.use(
    express.urlencoded({
        extended: true,
    })
    );
    app.use(express.json());

    //DB here
    openDBConnection();
    const con = getCon();

    //Auth here
    authorization(app, con);

    //APIs here
    foodsAPI(app, con);
    reservationsAPI(app, con);
    userValidationAPI(app, con);
    
    app.listen(port, () => {
    console.log(`Port info ${port}`);
    });
}

export { server };
