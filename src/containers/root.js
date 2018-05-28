let loadedModule = null;

if (process.env.NODE_ENV === 'production') {
  loadedModule = require('./root.prod.js');
} else {
  loadedModule = require('./root.dev.js');
}

export const Root = loadedModule;