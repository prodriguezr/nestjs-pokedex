export const AppConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  databaseUrl: process.env.MONGODB_URL,
  port: +process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 2,
  defaultSeedLimit: +process.env.DEFAULT_SEED_LIMIT || 5,
});
