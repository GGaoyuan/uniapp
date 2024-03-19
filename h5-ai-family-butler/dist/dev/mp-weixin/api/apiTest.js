"use strict";
const utils_request = require("../utils/request.js");
const apiTest = {
  getTest: (params) => utils_request.http.get("/test", params),
  postTest: (params) => utils_request.http.post("/test", params)
};
exports.apiTest = apiTest;
