exports.up = function (knex) {
    return knex.schema
        .createTable('Users', function (table) {
            table.increments('id').primary();
            table.string('username', 50).notNullable();
            table.string('email', 100).notNullable().unique();
            table.string('password', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('Venues', function (table) {
            table.increments('id').primary();
            table.string('name', 100).notNullable();
            table.string('address', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('Events', function (table) {
            table.increments('id').primary();
            table.string('name', 100).notNullable();
            table.text('description');
            table.timestamp('start_time').notNullable();
            table.timestamp('end_time');
            table.integer('venue_id').unsigned().notNullable().references('id').inTable('Venues');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        
        .dropTableIfExists('Events')
        .dropTableIfExists('Venues')
        .dropTableIfExists('Users');
};

