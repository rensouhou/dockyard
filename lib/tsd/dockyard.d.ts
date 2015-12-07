
declare module Dockyard {

  /**
   * The result from a processed network event
   */
  interface NetworkRequestResult {
    path?: string;
    event: string;
    requestGetData: any;
    requestPostData: any;
  }

  class GameDataHandler {

  }
}