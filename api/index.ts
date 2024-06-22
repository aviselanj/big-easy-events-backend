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

// ********** Users **********
// Get all users
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await db('users').select('*');
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Get user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await db('users').where('user_id', req.params.id).first();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Create new user
app.post('/users', async (req: Request, res: Response) => {
    try {
        const [id] = await db('users').insert(req.body).returning('user_id');
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Update user by ID
app.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const updated = await db('users').where('user_id', req.params.id).update(req.body);
        if (!updated) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Delete user by ID
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await db('users').where('user_id', req.params.id).del();
        if (!deleted) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});


// ********** Venues **********
// Get all venues
app.get('/venues', async (req: Request, res: Response) => {
    try {
        const venues = await db('venues').select('*');
        res.json(venues);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Get venue by ID
app.get('/venues/:id', async (req: Request, res: Response) => {
    try {
        const venue = await db('venues').where('venue_id', req.params.id).first();
        if (!venue) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        res.json(venue);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Create new venue
app.post('/venues', async (req: Request, res: Response) => {
    try {
        const [id] = await db('venues').insert(req.body).returning('venue_id');
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Update venue by ID
app.put('/venues/:id', async (req: Request, res: Response) => {
    try {
        const updated = await db('venues').where('venue_id', req.params.id).update(req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        res.json({ message: 'Venue updated successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Delete venue by ID
app.delete('/venues/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await db('venues').where('venue_id', req.params.id).del();
        if (!deleted) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        res.json({ message: 'Venue deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// ********** Events **********
// Get all events
app.get('/events', async (req: Request, res: Response) => {
    try {
        const events = await db('events').select('*');
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Get event by ID
app.get('/events/:id', async (req: Request, res: Response) => {
    try {
        const event = await db('events').where('event_id', req.params.id).first();
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Create new event
app.post('/events', async (req: Request, res: Response) => {
    try {
        const [id] = await db('events').insert(req.body).returning('event_id');
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Update event by ID
app.put('/events/:id', async (req: Request, res: Response) => {
    try {
        const updated = await db('events').where('event_id', req.params.id).update(req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Delete event by ID
app.delete('/events/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await db('events').where('event_id', req.params.id).del();
        if (!deleted) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// ********** Tickets **********
// Get all tickets
app.get('/tickets', async (req: Request, res: Response) => {
    try {
        const tickets = await db('tickets').select('*');
        res.json(tickets);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Get ticket by ID
app.get('/tickets/:id', async (req: Request, res: Response) => {
    try {
        const ticket = await db('tickets').where('ticket_id', req.params.id).first();
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Create new ticket
app.post('/tickets', async (req: Request, res: Response) => {
    try {
        const [id] = await db('tickets').insert(req.body).returning('ticket_id');
        res.status(201).json({ id });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Update ticket by ID
app.put('/tickets/:id', async (req: Request, res: Response) => {
    try {
        const updated = await db('tickets').where('ticket_id', req.params.id).update(req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json({ message: 'Ticket updated successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Delete ticket by ID
app.delete('/tickets/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await db('tickets').where('ticket_id', req.params.id).del();
        if (!deleted) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Error Handlers

// 404 error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('404 NOT FOUND: You are so lost!');
    res.status(404);
    res.json({ error: error.message });
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
// Initialize knex with the correct environment configuration
export default db;