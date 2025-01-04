const users = [
    { username: 'johndoe123', firstName: 'John', lastName: 'Doe', email: 'johndoe123@example.com', gender: 'Male', visits: 35 },
    { username: 'janedoe456', firstName: 'Jane', lastName: 'Doe', email: 'janedoe456@example.com', gender: 'Female', visits: 52 },
    { username: 'mikebaker789', firstName: 'Mike', lastName: 'Baker', email: 'mikebaker789@example.com', gender: 'Male', visits: 12 },
    { username: 'susanmiller22', firstName: 'Susan', lastName: 'Miller', email: 'susanmiller22@example.com', gender: 'Female', visits: 47 },
    { username: 'davidson_123', firstName: 'David', lastName: 'Son', email: 'davidson_123@example.com', gender: 'Male', visits: 11 },
    { username: 'alicewilliams567', firstName: 'Alice', lastName: 'Williams', email: 'alicewilliams567@example.com', gender: 'Female', visits: 69 },
    { username: 'tommyguy001', firstName: 'Tommy', lastName: 'Guy', email: 'tommyguy001@example.com', gender: 'Male', visits: 25 },
    { username: 'emilygreen_321', firstName: 'Emily', lastName: 'Green', email: 'emilygreen_321@example.com', gender: 'Female', visits: 53 },
    { username: 'brianjones97', firstName: 'Brian', lastName: 'Jones', email: 'brianjones97@example.com', gender: 'Male', visits: 18 },
    { username: 'lindaharris200', firstName: 'Linda', lastName: 'Harris', email: 'lindaharris200@example.com', gender: 'Female', visits: 41 },
    { username: 'kevinmartin98', firstName: 'Kevin', lastName: 'Martin', email: 'kevinmartin98@example.com', gender: 'Male', visits: 34 },
    { username: 'rachelpearson99', firstName: 'Rachel', lastName: 'Pearson', email: 'rachelpearson99@example.com', gender: 'Female', visits: 26 },
    { username: 'chriswhite85', firstName: 'Chris', lastName: 'White', email: 'chriswhite85@example.com', gender: 'Male', visits: 67 },
    { username: 'mariahwalker12', firstName: 'Mariah', lastName: 'Walker', email: 'mariahwalker12@example.com', gender: 'Female', visits: 29 },
    { username: 'jameswilson44', firstName: 'James', lastName: 'Wilson', email: 'jameswilson44@example.com', gender: 'Male', visits: 51 },
    { username: 'oliviarodriguez66', firstName: 'Olivia', lastName: 'Rodriguez', email: 'oliviarodriguez66@example.com', gender: 'Female', visits: 22 },
    { username: 'danielmitchell77', firstName: 'Daniel', lastName: 'Mitchell', email: 'danielmitchell77@example.com', gender: 'Male', visits: 61 },
    { username: 'paulamartinez98', firstName: 'Paula', lastName: 'Martinez', email: 'paulamartinez98@example.com', gender: 'Female', visits: 16 },
    { username: 'alexanderscott33', firstName: 'Alexander', lastName: 'Scott', email: 'alexanderscott33@example.com', gender: 'Male', visits: 23 },
    { username: 'sophiataylor44', firstName: 'Sophia', lastName: 'Taylor', email: 'sophiataylor44@example.com', gender: 'Female', visits: 49 }
];
// Return array of email addresses in ascending alphabetical order
const getEMails = () => {
    return users
        .map(user => user.email)
        .sort();
};

// Return number of users of specified gender (defaults to Female if no gender provided)
const amountByGender = (gender) => {
    return users.filter(user => user.gender === (gender || 'Female')).length;
};

// Return number of users with visits less than the specified amount
const howManyLowerThan = (hits) => {
    return users.filter(user => user.visits < hits).length;
};

// Return array of objects with visit counts and number of users with that count
const groupByHits = () => {
    // Create object with visit counts
    const hitCounts = users.reduce((acc, user) => {
        acc[user.visits] = (acc[user.visits] || 0) + 1;
        return acc;
    }, {});

    // Convert to array of objects and sort by hits descending
    return Object.entries(hitCounts)
        .map(([hits, amount]) => ({ hits: parseInt(hits), amount }))
        .sort((a, b) => b.hits - a.hits);
};

// Return array of arrays with gender and corresponding user objects
const groupByGender = () => {
    return ['Male', 'Female'].map(gender => [
        gender,
        users.filter(user => user.gender === gender)
    ]);
};

// Return function that filters users by first letter of firstName
const createFunctionOfLetter = (letter) => {
    return () => users
        .filter(user => user.firstName.startsWith(letter))
        .map(user => user.firstName);
};

module.exports = {
    getEMails,
    amountByGender,
    howManyLowerThan,
    groupByHits,
    groupByGender,
    createFunctionOfLetter
};