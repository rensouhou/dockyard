/**
 * @overview
 *  Dexie data adapter
 *
 * @since 0.1.1
 * @author Anon
 * @module core/db/db
 */

import Dexie from 'dexie';

import config from './config';
import stores from './stores';

const db = new Dexie(config.dbName);

export default db;