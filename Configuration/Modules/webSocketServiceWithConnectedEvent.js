import { WebSocketService } from '/modules/webSocketService.js';

export class WebSocketServiceWithConnectedEvent extends WebSocketService {
    #onConnected;
    #onDisconnected;

    constructor(onConnected, onDisconnected, context, isPrintLog = false) {
        super(context, isPrintLog);
        this.#onConnected = onConnected;
        this.#onDisconnected = onDisconnected;
    }

    _onConnected() {
        super._onConnected();
        this._invoke(this.#onConnected);
    }

    _onDisconnected() {
        super._onDisconnected();
        this._invoke(this.#onDisconnected);
    }

    _invoke(func) {
        if (func && func instanceof Function) {
            func.call(this._context);
        }
    }
}