require("dotenv").config(); 

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.SUPABASE_HOST,
            user: process.env.SUPABASE_USER,
            password: process.env.SUPABASE_PASSWORD,
            database: "postgres",
        },
        migrations: {
            tableName: 'knex_migrations', 
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        },
    },
};
