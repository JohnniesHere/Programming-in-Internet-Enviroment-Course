const {
    getEMails,
    amountByGender,
    howManyLowerThan,
    groupByHits,
    groupByGender,
    createFunctionOfLetter
} = require('./Users.js');

// Test the functions
console.log("All emails:", getEMails());
console.log("Number of females:", amountByGender());
console.log("Number of males:", amountByGender("Male"));
console.log("Users with less than 30 visits:", howManyLowerThan(30));
console.log("Groups by hits:", groupByHits());
console.log("Groups by gender:", groupByGender());

const findNamesStartingWithJ = createFunctionOfLetter("J");
console.log("Names starting with J:", findNamesStartingWithJ())