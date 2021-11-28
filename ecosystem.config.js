module.exports = {
  apps: [
    {
      name: 'ecommerce',
      script: 'server.js',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
