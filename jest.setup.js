// eslint-disable-next-line @typescript-eslint/no-require-imports
const fetchMock = require("jest-fetch-mock");

global.fetch = fetchMock;

fetchMock.enableMocks();