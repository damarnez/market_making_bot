const CustomError = require('./CustomError');

test('shoud throw the custom error', () => {
  try {
    throw new CustomError('TAG', 'CUSOM ERROR');
    expect(false).toBe(true);
  } catch (error) {
    expect(error.tag).toBe('TAG');
  }
});
