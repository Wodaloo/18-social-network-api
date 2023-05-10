const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing courses
    await User.deleteMany({});

    // Drop existing students
    await Thought.deleteMany({});

    // Create empty array to hold the students
    const users = [
        {
            username: "kelly",
            email: "kelly@gmail.com"
        },
        {
            username: "Wodaloo",
            email: "Wodaloo@gmail.com"
        }
    ];


    await User.collection.insertMany(users);



    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
