const mongoose = require('mongoose');
require('dotenv').config();

async function fix() {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    const col = mongoose.connection.collection('userdailyquizzes');
    
    const indexes = await col.getIndexes();
    console.log('Current indexes:', Object.keys(indexes));
    
    const stale = Object.keys(indexes).filter(n => n.includes('attemptDate'));
    for (const name of stale) {
        console.log('Dropping stale index:', name);
        await col.dropIndex(name);
    }
    
    // Remove orphan docs that don't have quizDate
    const del = await col.deleteMany({ quizDate: { $exists: false } });
    console.log('Orphan docs removed:', del.deletedCount);
    
    console.log('Done! Index fix applied.');
    process.exit(0);
}

fix().catch(e => { console.error(e); process.exit(1); });
