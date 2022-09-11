const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB online');
    } catch (err) {
        console.log(err);
        throw new Error('Error en la bases de datos - view logs')
    }
}

module.exports = {
    dbConnection
}