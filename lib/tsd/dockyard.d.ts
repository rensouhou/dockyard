namespace Dockyard {
  import Action = chrome.fileSystemProvider.Action;
  declare function GameDataHandlerFn(eventRecord:NetworkEvent, dispatcher?:GameDataDispatcherActions):void;

  interface NetworkEvent extends Immutable.Record.Class {
    path?: string;
    event: string;
    GET: any;
    POST: any;
  }

  interface Dispatcher {
    dispatch(action): void;
  }

  interface Mongleable {
    gotData: any;
    postData: any;
  }

  /**
   * Game Data Dispatcher
   */
  enum GameDataDispatcherActions {}

  interface GameDataDispatcher {
    actionType: GameDataDispatcherActions;
    eventType: string;
    payload?: any;
  }

  /**
   * Network Request Handler
   */
  interface NetworkRequestHandler {
    new(handler:NetworkEvent): void;

    getData(): NetworkEvent;
  }

  interface GameDataHandler {
    new(): void;

    registerHandler(event:string, handler:Function): void;
    handleEvent(event:NetworkEvent): void;
  }

  interface HandledEvent {
    successful: boolean;
    model?: any;
    models?: Array<any>;
  }

  // The base class from which all API event handlers are derived from
  interface BaseHandler {
    new(eventRecord:NetworkEvent, dispatcher:Dispatcher);

    handleState(): void;
    dispatchState(actionType?:ActionType): void;
  }

  // Dispatcher actions
  declare enum ActionType {
    UPDATE_API_DATA,
    UPDATE_GAME_DATA,
    UPDATE_PLAYER_PROFILE,
    UPDATE_QUEST_LIST
  }

  // Game events
  declare enum GameEvent {
    GET_BASE_DATA,
    GET_PROFILE_DATA
  }
}

declare module "dockyard" {
  export = Dockyard;
}