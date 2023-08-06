import {Client} from 'pg';

const dbClient = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',           //get user name from github
    password: 'test@123',       //get password from gitHUb
    database: 'postgres'        //get DB name
})

dbClient.connect().then((res)=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log('DB connection Error: ', err);
});

export default dbClient;
