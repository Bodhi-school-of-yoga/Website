export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("POSTGRES_HOST", "127.0.0.1"),
      port: env.int("POSTGRES_PORT", 5432),
      database: env("POSTGRES_DB", "bodhi"),
      user: env("POSTGRES_USER", "bodhi_user"),
      password: env("POSTGRES_PASSWORD", "changeme_strong_password"),
      ssl: env.bool("DATABASE_SSL", false)
        ? { rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false) }
        : false,
      schema: env("DATABASE_SCHEMA", "public"),
    },
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 10),
    },
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  },
});
