export default {
    SECRET: 'LOGIN__EXPRESSJS2021',
    dbURL: 'mongodb://localhost/logindb',
    dbOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}