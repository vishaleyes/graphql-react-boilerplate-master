const express = require('express');
const graphqlHTTP = require('express-graphql');
//const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors');
const userSchema = require('../server/schema.gql');
//const { getUser } = require('./User');
const schema = require('./schema');
import userResolvers from './userResolvers';
import productResolvers from './productResolvers';
console.log("userResolvers", userResolvers);


const app = express();
app.use(cors());


// const root2 = {
//   getUsers: (args, req) => queryDB(req, "select * from users").then(data => data),
//   getUserInfo: (args, req) => queryDB(req, "select * from users where id = ?", [args.id]).then(data => data[0]),
//   updateUserInfo: (args, req) => queryDB(req, "update users SET ? where id = ?", [args, args.id]).then(data => data),
//   createUser: (args, req) => queryDB(req, "insert into users SET ?", args).then(data => data),
//   deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data)
// };

const root = {
  ...userResolvers,
  ...productResolvers
} 

console.log(root);


app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'userapp'
  });
  req.mysqlDb.connect();
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
