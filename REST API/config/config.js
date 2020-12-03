module.exports = {
    'development': {
        PORT: process.env.PORT || 3001,
        privateKey: 'DEVCOM-RESTAPI-PrivateKey',
        dbConnectionUrl: `mongodb+srv://ProjectDevComDBUser:${process.env.DB_PASSWORD}@devcom.rdkts.mongodb.net/DevCom?retryWrites=true&w=majority`
    },
    'production': {}
}