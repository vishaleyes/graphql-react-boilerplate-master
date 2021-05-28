const { buildSchema } = require('graphql');
//import buildSchema from 'graphql';

const schema = buildSchema(`
type User {
    id: String
    name: String
    job_title: String
    email: String
  }
  type Product {
    id: String
    name: String
    sku: String
  }
  type Query {
    getUsers: [User],
    getUserInfo(id: Int) : User,
    getProducts: [Product],
    getProductInfo(id: Int) : Product
  }
  type Mutation {
    updateUserInfo(id: Int, name: String, email: String, job_title: String) : Boolean
    createUser(name: String, email: String, job_title: String) : Boolean
    deleteUser(id: Int) : Boolean,
    updateProductInfo(id: Int, name: String, sku: String) : Boolean
    createProduct(name: String, sku: String) : Boolean
    deleteProduct(id: Int) : Boolean
  }
  `);


  module.exports =  schema;