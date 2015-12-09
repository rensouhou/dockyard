
namespace Dockyard {
  interface NetworkEvent {
    path?: string;
    event: string;
    requestGetData: any;
    requestPostData: any;
  }

  interface Mongleable {
    gotData: any;
    postData: any;
  }

  // Classes
  interface NetworkRequestHandler {
    new(handler: NetworkEvent): void;

    getData(): NetworkEvent;
  }

  interface GameDataHandler {
    new(): void;

    registerHandler(event: string, handler: Function): void;
    handleEvent(event: NetworkEvent): void;
  }

  // The one responsible for making sense of the API data, before it's dispatched somewhere.
  declare module ApiMongler {
    export function handle(data: Mongleable): any;
  }
}

declare module "dockyard" {
  export = Dockyard;
}