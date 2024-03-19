"use strict";
const components_ipViewComponents_define = require("../define.js");
const common_vendor = require("../../../common/vendor.js");
const components_ipViewComponents_sysComponents_IpComponent = require("../sysComponents/IpComponent.js");
common_vendor.createQuery([components_ipViewComponents_sysComponents_IpComponent.StateC], common_vendor.With(components_ipViewComponents_sysComponents_IpComponent.PlayerC));
const stateSystem = components_ipViewComponents_define.defineSystem((params) => {
});
exports.stateSystem = stateSystem;
