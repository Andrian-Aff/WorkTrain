(function () {
  return {
    title: '',
    hint: '',
    //formatTitle: function() {},
    customConfig:
      `<div id='container-demo-send'></div>`
    ,


    init: async function () {
    },

    load: function (data) { },

    afterViewInit: async function () {
      let qwSipleTabPanel = customElements.get('qw-siple-tab-panel');
      if(!qwSipleTabPanel){
        const moduleTab = await import('/modules/qwSimpleTabPanel.js');
        window.customElements.define('qw-siple-tab-panel', moduleTab.QWSimpleTabPanel);
        qwSipleTabPanel = customElements.get('qw-siple-tab-panel');
      }
      const container = document.getElementById("container-demo-send");
      const tabNames = ['test1', 'test2', 'test3'];
      const tabPanel = new qwSipleTabPanel(tabNames, 1);
      tabPanel.onTabClick = this.onTabClick;
      container.appendChild(tabPanel);
    },

    onTabClick: function (name) {
      console.log(name);
    },

    destroy: function () {
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
