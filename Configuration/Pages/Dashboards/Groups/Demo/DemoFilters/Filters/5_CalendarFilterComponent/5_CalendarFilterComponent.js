(function() {
    return {
        placeholder: 'CalendarFilterComponent',
        minDate: null,
        maxDate: null,
        showTime: true,
        showSeconds: true,
        hourFormat: 24,
        showButtonBar: true,
        numberOfMonths: 1,
        dateFormat: 'dd.mm.yy',
        monthNavigator: true,
        yearNavigator: true,
        yearRange: null,
        timeOnly: false,
        readonlyInput: null,
        view: 'date',
        type: 'DateTime',
        disabledDays: null,
        disabledDates: null,
        onItemSelect: function(date) {
            this.yourFunctionName(date);
        },
        yourFunctionName: function(value) {
            let message = {
                name: '',
                package: {
                    value: value
                }
            }
            this.messageService.publish(message);
        }
    };
}());
