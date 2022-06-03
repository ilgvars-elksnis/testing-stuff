import { aws, Schema, model } from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';

// gives us access to local testing
if (process.env.STAGE === "local") {
    aws.ddb.local(process.env.DYNAMO_URL);
}
/*
  Create the schema - how the table data should look)
  This schema also validates the input data when anything is used in the Model
*/
const  UsersSchema = new Schema({
    "id": {
        "type": String,
        "hashKey": true,
        default: uuidv4
      },
    "username": {
      "type": String,
      "required": true,
      "index": {
        "name": "UsernameIndex",
        "global": true,
      },
    },
    "vards": { "type": String },
    "uzvards": { "type": String },
    "loma": { "type": String },
    "parole": { "type": String },
    "Komentāri": { "type": String },
    "loggedIn": { "type": Boolean }

});

/* verify that all the env variables are set in .env file */
if (!process || !process.env || !process.env.USERS_TABLE_NAME) {
  throw new Error('no Inventory table name configured');
}
if (!process || !process.env || !process.env.SERVICE) {
  throw new Error('no service name configured');
}
if (!process || !process.env || !process.env.STAGE) {
  throw new Error('no stage configured');
}

const service = process.env?.SERVICE;
const stage = process.env?.STAGE;
const table = process.env?.USERS_TABLE_NAME;

/* this is how we access the data in the table, by providing table name and schema */
const Users = model(`${service}-${stage}-${table}`, UsersSchema);

export default Users;