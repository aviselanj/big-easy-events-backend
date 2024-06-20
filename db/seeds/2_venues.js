// 2_venues.js

exports.seed = async function (knex) {
    try {
        console.log('Starting venues seed');

        // Delete all existing entries in the Venues table
        await knex('venues').del();

        console.log('Deleted existing venues');

        // Insert new entries
        const venues = [
            { venue_id: 1, name: 'Jazz Hall', address: '123 Bourbon St', city: 'New Orleans', state: 'LA', zip_code: '70130', phone: '504-123-4567', website: 'http://jazzhall.com' },
            { venue_id: 2, name: 'Community Center', address: '456 Canal St', city: 'New Orleans', state: 'LA', zip_code: '70112', phone: '504-765-4321', website: 'http://communitycenter.com' }
        ];

        await knex('venues').insert(venues);

        console.log('Inserted new venues');
    } catch (error) {
        console.error('Error seeding venues:', error);
    }
};

