// MongoDB initialization script
/* eslint-disable no-undef */
var db = db.getSiblingDB('oauth');

// Create user collection with indexes
db.createCollection('users');

// Create indexes for better performance
db.users.createIndex({ "googleId": 1 }, { unique: true });
db.users.createIndex({ "email": 1 });
db.users.createIndex({ "createdAt": 1 });

print('Database initialized successfully');
