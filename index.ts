import { NextFunction } from "connect";
import express, { Request, Response } from "express";


const app = express();

app.use(
    express.json()
);
const port = 4000;
require("dotenv").config();

app.use(express.json());

const environment = "development";
const config = require("./knexfile")[environment];
const knex = require("knex")(config);


app.get('/',(req:Request , res:Response)=>{
    res.status(200).send("Welcome to Big Easy Events")
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

// ********** User **********
// Get all users
app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //const users = await db('users').select('*');
        //res.json(projects);
        res.send("Got users!");
    } catch (error) {
        next(error);
    }
});

// ********** Attend An Event **********

// ********** Virtual Tour ***********

// ERROR HANDLER
// 404 error handler


app.use((req:Request, res:Response, next)=>{
    const error = new Error("404 NOT FOUND: Wrong Place!");
    res.status(404);
    next(error);
});
 // general error handler
 
app.use((error: {status: number; message: any}, req:Request, res:Response, next:NextFunction)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});