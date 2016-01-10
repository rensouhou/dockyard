/**
 * @overview
 *
 * @since 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module core/db/dataAdapter
 */
import Dexie from 'dexie';
import R from 'ramda';
import { Tuple } from 'ramda-fantasy';
import config from './config';
import stores from './stores';
import Action from '../game/constants/Actions';

export default class ActionHandler {
  db = null;
  stores = stores;

  /**
   * @constructor
   */
  constructor() {
    this.db = new Dexie(config.dbName);

    // Make sure to catch all errors
    Dexie.Promise.on('error', (err) => console.error('Uncaught error in Dexie;', err));

    this.db.on('blocked', () => {
      console.error('DB is blocked, invoking debugger (if possible).');
      debugger;
    });

    this.initializeStores();

    window.__db = this.db;

    this.db.open();
  }

  /**
   * Initialize stores for the db
   */
  initializeStores() {
    this.stores.forEach((store) => {
      let [ver, storeDef] = store;
      console.log('Registering version %s of stores:\n%s', ver, Object.keys(storeDef).join(', '));
      this.db.version(ver).stores(storeDef);
    });
  }

  /**
   * @param {!string} key
   * @param {*} value
   */
  putAll(key, value) {
    R.forEach((val) => {
      this.db[key].put(val);
    }, R.toPairs(value));
  }

  /**
   * @param {Object} action
   */
  getHandlerFn(action) {
    console.log('db middleware action handler got action =>', action);

    switch (action.type) {
      case Action.UPDATE_BASE_DATA:

        this.db.transaction('rw',
          this.db.baseDataShips,
          this.db.baseDataShipTypes,
          () => {
            let baseShips = R.toPairs(action.payload.ships);
            let baseShipTypes = R.toPairs(action.payload.shipTypes);

            baseShips.forEach((it) => this.db.baseDataShips.put(R.last(it)));
            baseShipTypes.forEach((it) => this.db.baseDataShipTypes.put(R.last(it)));
          });
        break;

      case Action.UPDATE_PLAYER_STATE:
        break;

      case Action.UPDATE_QUEST_LIST:
        this.db.transaction('rw', this.db.quests, () => {
          R.toPairs(action.payload.quests).forEach((it) => this.db.quests.put(R.last(it)));
        });
        break;

      case Action.UPDATE_PVP_OPPONENT:
        this.db.transaction('rw', this.db.pvpOpponent, () => {
          this.db.pvpOpponent.put(action.payload);
        });
        break;

      case Action.CREATE_ITEM:

        break;

      default:
        break;
    }
  }
};