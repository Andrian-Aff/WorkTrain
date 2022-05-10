(function() {
    return {
        title: [],
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                `
        ,
        setGlobalFilterPanelVisibility: function(state) {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: state
                }
            };
            this.messageService.publish(msg);
        },
        init: function() {
             this.setGlobalFilterPanelVisibility(true);
        },
        afterViewInit: function(message1) {
        }
    };
}());
