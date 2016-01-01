/**
 * @overview
 *  Chrome extension background script
 *
 * @since 0.1.0
 * @version 0.1.1
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module src/chrome/background
 */
import { GameDataHandler } from '../core/game';

chrome.runtime.onConnect.addListener(new GameDataHandler());

