
namespace Dockyard {
  declare function GameDataHandlerFn (eventRecord: NetworkEvent, dispatcher?: GameDataDispatcherActions): void;

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
    new(handler: NetworkEvent): void;

    getData(): NetworkEvent;
  }

  interface GameDataHandler {
    new(): void;

    registerHandler(event: string, handler: Function): void;
    handleEvent(event: NetworkEvent): void;
  }

  interface HandledEvent {
    successful: boolean;
    model?: any;
    models?: Array<any>;
  }

  // The one responsible for making sense of the API data, before it's dispatched somewhere.
  declare module ApiMongler {
    export function handle(data: Mongleable): any;
  }

  interface BaseHandler {
    new(eventRecord: NetworkEvent, dispatcher: Dispatcher);
    dispatchState(): void;
  }
}

declare module "dockyard" {
  export = Dockyard;
}