exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Users').del()
        .then(function () {
            // Inserts seed entries
            return knex('Users').insert([
                { id: 1, username: 'john_doe', email: 'john@example.com', password: 'hashed_password' },
                { id: 2, username: 'jane_doe', email: 'jane@example.com', password: 'hashed_password' }
            ]);
        });
};

