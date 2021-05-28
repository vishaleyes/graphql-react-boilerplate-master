const express = require("express");
import queryDB from "./queryDb";

const resolvers = {
  getUsers: (args, req) => {
    return queryDB(req, "select * from users").then((data) => data);
  },
  getUserInfo: (args, req) => {
    return queryDB(req, "select * from users where id = ?", [args.id]).then(
      (data) => data[0]
    );
  },
  updateUserInfo: (args, req) => {
    return queryDB(req, "update users SET ? where id = ?", [
      args,
      args.id,
    ]).then((data) => data);
  },
  createUser: (args, req) => {
    return queryDB(req, "insert into users SET ?", args).then((data) => data);
  },
  deleteUser: (args, req) => {
    return queryDB(req, "delete from users where id = ?", [args.id]).then(
      (data) => data
    );
  },
};
export default resolvers;
//module.exports = resolvers;
