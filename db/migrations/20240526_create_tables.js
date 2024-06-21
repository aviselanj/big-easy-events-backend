exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('user_id').primary();
            table.string('username', 50).notNullable();
            table.string('email', 100).notNullable().unique();
            table.string('password', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        
        .then(function () {
            return knex.schema.createTable('venues', function (table) {
                table.increments('venue_id').primary();
                table.string('name', 100).notNullable();
                table.string('address', 255).notNullable();
                table.string('city', 50).notNullable();
                table.string('state', 50).notNullable();
                table.string('zip_code', 20).notNullable();
                table.string('phone', 20).notNullable();
                table.string('website', 255).nullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        })
        .then(function () {
            return knex.schema.createTable('events', function (table) {
                table.increments('event_id').primary();
                table.string('name', 100).notNullable();
                table.text('description').notNullable();
                table.timestamp('start_time').notNullable();
                table.timestamp('end_time').notNullable();
                table.integer('venue_id').unsigned().notNullable().references('venue_id').inTable('venues').onDelete('CASCADE');
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
        })
        .then(function () {
            return knex.schema.createTable('tickets', function (table) {
                table.increments('ticket_id').primary();
                table.integer('event_id').unsigned().notNullable().references('event_id').inTable('events').onDelete('CASCADE');
                table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
                table.decimal('price', 8, 2).notNullable();
                table.integer('quantity').notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            });
            
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tickets')
        .dropTableIfExists('events')
        .dropTableIfExists('venues')
        .dropTableIfExists('users');
};
