
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Venues').del()
        .then(function () {
            // Inserts seed entries
            return knex('Venues').insert([
                { id: 1, name: 'Conference Hall', address: '123 Main St' },
                { id: 2, name: 'Community Center', address: '456 Elm St' }
            ]);
        });
};
