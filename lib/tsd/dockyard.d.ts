namespace Dockyard {
  import Record = Immutable.Record;
  import MapStore = FluxUtils.MapStore;
  import Dispatcher = Flux.Dispatcher;

  function GameDataHandlerFn(eventRecord: NetworkEvent, dispatcher?: Action): void;

  interface Request extends chrome.devtools.network.Request {
    request: Object;
    response: Object;
  }

  interface NetworkEventMsg {
    event: string;
    requestResult: Object;
    content: string;
  }

  interface MethodObject {
    GET?: Object;
    POST?: Object;
  }

  interface NetworkEvent extends Record.Class {
    path?: string;
    event: string;
    method: MethodObject;
  }

  interface Dispatcher {
    dispatch(action): void;
  }

  /**
   * Game Data Dispatcher
   */
  interface GameDataDispatcher {
    action: Action;
    payload?: Object;
  }

  /**
   * Network Request Handler
   */
  interface NetworkRequestHandler {
    new(handler: NetworkEvent): void;
    getData(): NetworkEvent;
  }

  interface GameDataHandler {
    new(opts?: GameDataHandlerOpts): Function;

    registerHandler(event: string, handler: Function): void;
    handleEvent(event: NetworkEvent): void;
    listenerFn(port: chrome.runtime.Port): Function;
    messageListenerFn(msg: Object): void;
  }

  interface GameDataHandlerOpts {
    dataAdapter: Function;
  }

  interface HandledEvent {
    successful: boolean;
    model?: any;
    models?: Array<any>;
  }

  // The base class from which all API event handlers are derived from
  interface BaseHandler {
    new(eventRecord: NetworkEvent, dispatcher: Dispatcher);

    handleState(): void;
    dispatchState(actionType?: ActionType): void;
  }

  enum CoreEvent {
    API_DATA_RECEIVED,
    REQUEST_CONTENT_PARSE,
    REQUEST_CONTENT_PARSE_ERROR
  }

  // Dispatcher actions
  enum ActionType {
    UPDATE_API_DATA,
    UPDATE_GAME_DATA,
    UPDATE_PLAYER_PROFILE,
    UPDATE_QUEST_LIST
  }

  enum Action {
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CREATE_SHIP,
    CREATE_SHIP_FINISH,
    UPDATE_SHIP,
    DELETE_SHIP,
    UPDATE_PLAYER_STATE,
    CREATE_BASE_DATA,
    UPDATE_BASE_DATA,
    UPDATE_QUEST_LIST,
    UPDATE_GAME_STATE
  }

  // Game events
  enum GameEvent {
    GET_BASE_DATA,
    GET_PROFILE_DATA
  }

  // Game states
  enum GameState {
    IDLE,
    IN_SORTIE,
    IN_PRACTICE,
    IN_REPAIR_DOCKS,
    IN_MENU,
    IN_QUEST_LIST,
    OTHER
  }

  interface GameStateStore extends MapStore {
    new(dispatcher: Dispatcher, actions?: any);
  }

  interface GameStateMap {
    state: GameState;
  }

  module GameAPI {
    // @payload CRAFT_ITEM
    interface CraftItem {
      materialsUsed: Object;
      item: Object;
    }
  }

  module Stores {
    interface PlayerState {
      profile: Object;
      materials: Object;
      fleets: Array<Object>;
      ships: Object;
      shipTypes: Object;
    }
  }
}

declare module "dockyard" {
  export = Dockyard;
}