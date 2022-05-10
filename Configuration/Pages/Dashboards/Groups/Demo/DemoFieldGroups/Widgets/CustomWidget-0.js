(function () {
    return {
        customConfig:
            `<div id='container-demo-send'></div>`
        ,

        afterViewInit: async function () {
            this.tabPanelConfigs = [
                {
                    name: 'Пример 1',
                    widget: document.getElementById('c12')
                },
                {
                    name: 'Пример 2',
                    widget: document.getElementById('c13')
                },
            ];

            let qwSipleTabPanel = customElements.get('qw-siple-tab-panel');
            if (!qwSipleTabPanel) {
                const moduleTab = await import('/modules/qwSimpleTabPanel.js');
                window.customElements.define('qw-siple-tab-panel', moduleTab.QWSimpleTabPanel);
                qwSipleTabPanel = customElements.get('qw-siple-tab-panel');
            }
            const container = document.getElementById("container-demo-send");
            const tabNames = this.tabPanelConfigs.map(con => con.name);
            const tabPanel = new qwSipleTabPanel(tabNames, 0);
            tabPanel.onTabClick = this.onTabClick.bind(this);
            container.appendChild(tabPanel);
        },

        onTabClick: function (name) {
            console.log(name);
            const tab = this.getTabSelected(name);
            this.tabPanelConfigs.forEach(item => {
                item.widget.style.display = "none";
            });
            tab.widget.style.display = "block";
        },

        getTabSelected: function (name) {
            const item = this.tabPanelConfigs.find(con => con.name === name);
            if (item) {
                return item;
            }
            throw 'is not exist selected tab';
        },
    };
}());
