import { QueryResult } from 'pg';
import { client } from './connection';

client.query('select * from social_media_details', (err: any, result: QueryResult<any>)=>{
    if(!err) {
        console.log('Result: ', result.rows);
    } else {
        console.log('Error from query: ', err.message);
    }
    client.end();
})