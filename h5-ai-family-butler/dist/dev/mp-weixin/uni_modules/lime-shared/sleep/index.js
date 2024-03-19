"use strict";
const sleep = (delay = 300) => new Promise((resolve) => setTimeout(resolve, delay));
exports.sleep = sleep;
