(function() {
    return {
        init: function() {
            this.form.showPagePreloader('Через 4 сек. прелоадер автоматично закриється');

            let timerId = setTimeout(function tick() {
                this.form.hidePagePreloader();
                clearTimeout(timerId);
            }.bind(this), 4000);

        },
        afterSave: function(data) {
        }
    };
}());