import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const app = express();
const port = 4000;

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');
const config = knexConfig[environment];
const db = knex(config);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to Big Easy Events');
});
// ********** User **********
// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await db('users').select('*');
        res.json(users);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

// Get user by ID
app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await knex('users').where('id', req.params.id).first();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

// Create new user
app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [id] = await knex('users').insert(req.body).returning('id');
        res.status(201).json({ id });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

// Update user by ID
app.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await knex('users').where('id', req.params.id).update(req.body);
        if (!updated) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

// Delete user by ID
app.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await knex('users').where('id', req.params.id).del();
        if (!deleted) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

// ********** venues **********
// Get all venues
app.get('/venues', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const venues = await knex('venues').select('*');
        res.json(venues);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
});

// Similar routes for venues, Organizers, events...

// Error Handlers

// 404 error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('404 NOT FOUND: You are so lost!');
    res.status(404);
    const err = error as Error;
    res.status(400).json({ error: err.message });
});

// General error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
