module.exports = {
  ...jest.requireActual('..'),
  __esModules: true, // allows ES imports
  getSecretWord: jest.fn().mockReturnValue(Promise.resolve('party')),
};
