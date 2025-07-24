module.exports = {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    tokenLife: '1h',  // Token expiration time
  };
  