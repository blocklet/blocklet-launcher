const getItem = (key) => JSON.parse(sessionStorage.getItem(key));

const setItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

module.exports = {
  getItem,
  setItem,
};
