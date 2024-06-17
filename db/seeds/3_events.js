exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Events').del()
        .then(function () {
            // Inserts seed entries
            return knex('Events').insert([
                { id: 1, name: 'Tech Conference', description: 'A tech conference', start_time: '2024-06-01 10:00:00', end_time: '2024-06-01 17:00:00', venue_id: 1 },
                { id: 2, name: 'Community Meeting', description: 'A community meeting', start_time: '2024-06-02 12:00:00', end_time: '2024-06-02 15:00:00', venue_id: 2 }
            ]);
        });
};

