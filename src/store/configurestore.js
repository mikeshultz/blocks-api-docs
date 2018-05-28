let loadedStore = null;

if (process.env.NODE_ENV === 'production') {
  loadedStore = require('./configurestore.prod');
} else {
  loadedStore = require('./configurestore.dev');
}

export const configureStore = loadedStore;