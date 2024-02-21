"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupData = void 0;
var groupData = function (studentData) {
  //group data based on the key (year and dept)
  var groupData = studentData.reduce(function (acc, curr) {
    var key = "".concat(curr.year, "-").concat(curr.dept);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});
  // store the grouped data in an array of arrays(same keys are grouped together)
  var modifiedStudentData = Object.values(groupData);
  console.log("modifiedStudentData", modifiedStudentData);
  return modifiedStudentData;
};
exports.groupData = groupData;
