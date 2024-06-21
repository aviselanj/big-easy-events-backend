exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('tickets').del()
        .then(function () {
            // Inserts seed entries
            return knex('tickets').insert([
                { ticket_id: 1,event_id: 1, user_id: 1, price: 50.00, quantity: 2 },
                { ticket_id: 2,event_id: 2, user_id: 2, price: 30.00, quantity: 1 },
            ]);
        });
};
