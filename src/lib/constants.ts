import { existsSync } from 'fs';
import { join } from 'path';

let _dataDir = '';

if (existsSync('./data')) {
	_dataDir = './data';
} else if (existsSync('../data')) {
	_dataDir = '../data';
} else if (existsSync('/')) {
	_dataDir = '/data';
}

export const DATA_DIR = _dataDir;
export const BLACKLIST_FILE = join(DATA_DIR, 'blacklist.json');
export const SHIGGIES_DIR = join(DATA_DIR, 'shiggies');
export const TEMP_SHIGGIES_DIR = join(DATA_DIR, 'temp-shiggies');

export const SHIGGIES_ZIP_NAME = 'whatthefuckwhywouldyoudownloadthis.zip';

export const SHIGGIES_ZIP = join(DATA_DIR, SHIGGIES_ZIP_NAME);
