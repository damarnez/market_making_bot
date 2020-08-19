
const axios = require('axios');
jest.mock('axios');
const Api = require('./Api');
test('should return a list of orders', async () => {
  axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: [[1, 1, 1]] }));
  const response = await Api.Orderbook();
  expect(response.length).toBe(1);
});

test('should throw a custom error', async () => {
  axios.get.mockImplementation(() => Promise.resolve({ status: 400, data: [[1, 1, 1]] }));
  try {
    await Api.Orderbook();
  } catch (error) {
    expect(error.tag).toBe("API");
  }
});
