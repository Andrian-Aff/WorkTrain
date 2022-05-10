(function () {
  return {
    placeholder: 'MultiSelectFilterComponent',
    keyValue: 'Id',
    displayValue: 'Name',
    baseQueryOptions: {
        queryCode: 'List_ForFilter',
        filterColumns: null,
        limit: -1,
        parameterValues: [ {key:'@pageOffsetRows' , value:0},{key: '@pageLimitRows', value: 50} ],
        pageNumber: 1,
        sortColumns: [
            {
                key: 'Id',
                value: 0
            }
        ]
    },
    onItemSelect: function(item) {
        this.yourFunctionName(item);
    },
    onClearFilter: function() {
    },
    initValue: function() {
        let items2 = [];
			// items2.push({ value: 'New', viewValue: 'Нові' });	
			// items2.push({ value: 'ToWork', viewValue: 'Триває' });				
        this.setDefaultValue(items2);  
    },
    yourFunctionName: function(item) {
    }
};
}());
