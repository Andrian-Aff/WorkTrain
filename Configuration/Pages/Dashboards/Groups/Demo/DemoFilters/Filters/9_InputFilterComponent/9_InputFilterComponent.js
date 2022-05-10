(function() {
    return {
        placeholder: 'InputFilterComponent',
        onChangeValue: function(value) {
            this.yourFunctionName(value);
        },
        yourFunctionName: function(value) {
        },
        initValue: function() {
            this.setDefaultValue(null);
        }
    };
}());
