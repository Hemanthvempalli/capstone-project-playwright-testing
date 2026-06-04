// test-data/testData.js

const testData = {
  validUser: {
    username: 'practice',
    password: 'SuperSecretPassword!',
  },
  invalidUsername: 'wrongUser',
  invalidPassword: 'WrongPassword123',
  sqlInjection: "' OR '1'='1",

  books: {
    javascript: '674108466cb6226060a20d44',
    devops:     '67410b8c6cb6226060a20da4',
    agile:      '67410a586cb6226060a20d8d',
  },
};

module.exports = testData;