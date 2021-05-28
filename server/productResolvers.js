const express = require("express");
import queryDB from "./queryDb";

const productResolvers = {
  getProducts: (args, req) => {
    return queryDB(req, "select * from product").then((data) => data);
  },
  getProductInfo: (args, req) => {
    return queryDB(req, "select * from product where id = ?", [args.id]).then(
      (data) => data[0]
    );
  },
  updateProductInfo: (args, req) => {
    return queryDB(req, "update product SET ? where id = ?", [
      args,
      args.id,
    ]).then((data) => data);
  },
  createProduct: (args, req) => {
    return queryDB(req, "insert into product SET ?", args).then((data) => data);
  },
  deleteProduct: (args, req) => {
    return queryDB(req, "delete from product where id = ?", [args.id]).then(
      (data) => data
    );
  },
};
export default productResolvers;
//module.exports = resolvers;
