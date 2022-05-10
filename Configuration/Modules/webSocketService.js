export class WebSocketService {
    #isPrintLog;
    _subs = [];
    _subWebSocketEvents = null;
    _webSocketEventService;
    _context;
    _events;

    constructor(context, isPrintLog = false) {
        if (!context) {
            throw new Error("argument context is null or undefined");
        }
        this._webSocketEventService = context.webSocketEventService;
        this._context = context;
        this.#isPrintLog = isPrintLog;
    }

    run(events) {
        if (!events) {
            throw new Error("argument events is null or undefined");
        }
        this._events = events;
        this._initWebSocketEvents();
    }

    destroy() {
        this._subs.forEach(item => item.unsubscribe());
        this._unsubscribeWebSocketEvents();
    }

    publish(event) {
        if (!event) {
            throw new Error("argument event is null or undefined");
        }
        if (!event.name || !event.name.trim()) {
            throw new Error("property event.name is null or undefined or empty");
        }
        if (!event.package) {
            throw new Error("property event.package is null or undefined");
        }
        this._webSocketEventService.publish(event);
    }

    _initWebSocketEvents() {
        if (this._webSocketEventService.isConnected) {
            this._subscribeWebSocketEvents()
        }
        this._subs.push(this._webSocketEventService.connected$.subscribe(this._onConnected.bind(this)));
        this._subs.push(this._webSocketEventService.disconnected$.subscribe(this._onDisconnected.bind(this)));
    }

    _onConnected() {
        this._subscribeWebSocketEvents();
    }

    _onDisconnected() {
        this._unsubscribeWebSocketEvents();
    }

    _subscribeWebSocketEvents() {
        if (!this._subWebSocketEvents) {
            this._printLog("subscribe 'WebSocketEvents'");
            this._subWebSocketEvents = [];
            this._events.forEach(item => {
                if (!item.name || !item.name.trim()) {
                    throw new Error("property event.name is null or undefined or empty");
                }
                if (!item.callback) {
                    throw new Error("property event.callback is null or undefined");
                }
                if (!item.callback instanceof Function) {
                    throw new Error("property event.callback is not a Function");
                }
                this._subWebSocketEvents.push(this._webSocketEventService.subscribe(item.name, item.callback, this._context));
            });
        }
    }

    _unsubscribeWebSocketEvents() {
        if (this._subWebSocketEvents) {
            this._printLog("unsubscribe 'WebSocketEvents'");
            this._subWebSocketEvents.forEach(item => item.unsubscribe());
            this._subWebSocketEvents = null;
        }
    }

    _printLog(log) {
        if (this.#isPrintLog) {
            console.log(log);
        }
    }
}