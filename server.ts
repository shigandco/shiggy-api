import { server } from './build/index.js';
import getShiggies from './src/lib/server/getShiggies';

getShiggies();

// Shim to keep the minifier from removing the import
server ? '' : '';
