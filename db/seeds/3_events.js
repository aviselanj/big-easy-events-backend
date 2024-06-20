exports.seed = async function (knex) {
    try {
        console.log('Starting events seed');

        // Delete all existing entries in the Events table
        await knex('events').del();

        console.log('Deleted existing events');

        // Insert new entries
        const events = [
            {
                event_id: 1,
                name: 'Tech Conference',
                description: 'A tech conference',
                start_time: '2024-06-01 10:00:00',
                end_time: '2024-06-01 17:00:00',
                venue_id: 1
            },
            { 
                event_id: 2, 
                name: 'Community Meeting', 
                description: 'A community meeting', 
                start_time: '2024-06-02 12:00:00', 
                end_time: '2024-06-02 15:00:00', 
                venue_id: 2 }
        ];

        await knex('events').insert(events);

        console.log('Inserted new events');
    } catch (error) {
        console.error('Error seeding events:', error);
    }
};


