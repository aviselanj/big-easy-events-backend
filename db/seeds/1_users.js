exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                { user_id: 1, username: 'john_doe', password: 'hashed_password', email: 'john@example.com' },
                { user_id: 2, username: 'jane_doe', password: 'hashed_password', email: 'jane@example.com' }
            ]);
        });
};

