(function () {
  return {
    title: '',
    hint: '',
    //formatTitle: function() {},
    customConfig:
      `<div id='container-demo-send'></div>`
    ,

    subs: [],

    init: async function () {
      const moduleImport = await import("/modules/webSocketServiceWithConnectedEvent.js");//?dev=" + Math.floor(Math.random() * 100));
      this.webSocketService = new moduleImport.WebSocketServiceWithConnectedEvent(null, null, this, true);
      const events = [
        {
          name: 'ON_SEND_MESSAGE_WEB',
          callback: this.onSendMessage
        }
      ];
      this.webSocketService.run(events);
    },

    load: function (data) { },

    afterViewInit: async function () {
      this.createPanelAdd();
    },

    onTabClick: function (name) {
      console.log(name);
    },

    destroy: function () {
      this.webSocketService.destroy();
    },

    createPanelAdd: function () {
      const container = document.getElementById("container-demo-send");
      const sendBtn = this.createElement('button', { className: 'send-button', innerText: 'Send' });
      sendBtn.title = 'Send';
      sendBtn.disabled = true;
      const input = this.createElement('input', { className: 'add-input-message' });
      input.addEventListener('input', (e) => {
        if (e.target.value.trim()) {
          sendBtn.disabled = false;
        } else {
          sendBtn.disabled = true;
        }
      });
      sendBtn.addEventListener('click', () => {
        this.sendMessage(input.value);
      });
      const inputBtnDiv = this.createElement('div', { className: 'send-input-btn' }, sendBtn, input);
      this.panelDiv = this.createElement('div', { className: 'send-input-btn-panel' }, inputBtnDiv);
      container.appendChild(this.panelDiv);
    },

    sendMessage: function (value) {
      const event = {
        name: 'ON_SEND_MESSAGE_WEB',
        package: value
      };
      this.webSocketService.publish(event);
    },

    onSendMessage: function (event) {
      const value = this.createElement('div', { className: 'add-value', innerText: event.package });
      this.panelDiv.appendChild(value);
    },

    createElement: function (tag, props, ...children) {
      const element = document.createElement(tag);
      Object.keys(props).forEach(key => element[key] = props[key]);
      if (children.length > 0) {
        children.forEach(child => {
          element.appendChild(child);
        });
      } return element;
    },
  };
}());
