(function () {
  return {
    config: {
        query: {
            code: 'wt_Table_SelectRows',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
         allowColumnReordering: true,
         allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: false,
        showColumnLines: false,
        showRowLines: true,
        remoteOperations: null,
        allowColumnReordering: null,
        rowAlternationEnabled: null,
        columnAutoWidth: null,
        hoverStateEnabled: true,
        columnWidth: null,
        wordWrapEnabled: true,
        allowColumnResizing: true,
        showFilterRow: true,
        showHeaderFilter: false,
        showColumnChooser: false,
        showColumnFixing: true,
        groupingAutoExpandAll: null,
        columnMinWidth: 100,
        paging: {
            pageSize: 10000
        }, 
        pager: {
            showPageSizeSelector: false,
            showInfo: false
        },
        columns: [
            {
                dataField: 'PIB',
                caption: 'ПІБ'
            },
            {
                dataField: 'Date_Employ',
                caption: 'Дата прийому',
                width: 100,
                dataType: "datetime",
                format: "yyyy-MM-dd"
            },
            {
                dataField: 'Date_Uneploy',
                caption: 'Дата звільнення',
                width: 100,
                dataType: "datetime",
                format: "yyyy-MM-dd, HH:mm"
            },
            {
                dataField: 'DepartmentName',
                caption: 'Відділ'
            },
            {
                dataField: 'PositionName',
                caption: 'Посада'
            },
            {
                dataField: 'StatusName',
                caption: 'Статус'
            },
            {
                caption: 'Локація'
            }
        ],
        keyExpr: 'Id'
    },

    init: function() {
         this.loadData(this.afterLoadDataHandler);
        this.dataGridInstance.onCellPrepared.subscribe(e => {
            if(e.column.caption === 'Локація' && e.data !== undefined) {
                if (e.data.Location_Lat) {
                    let icon = this.createElement('span', { className: 'iconToLink dx-icon-map dx-icon-custom-style'});
                    e.cellElement.appendChild(icon);
                }
            }
        });

      
        this.dataGridInstance.onCellClick.subscribe(e => {
            e.event.stopImmediatePropagation();
            if(e.column) {
                if(e.column.caption === 'Локація' && e.row !== undefined && e.row.data.Location_Lat) {
                    let message = {
                        name: 'Table_OpenLocation',
                        Location_Lat: e.row.data.Location_Lat,
                        Location_Lon: e.row.data.Location_Lon
                    }
                    this.messageService.publish(message); 
                    // this.goToDashboard('Prozorro_Report_Detail', {queryParams: [{'Edr': e.key}, {'SumStart': this.SumStart}, {'SumEnd': this.SumEnd}, {'Date': formated_start_date}]});
                    // window.open(location.origin + localStorage.getItem('VirtualPath') + "/sheet/page/Prozorro_Report_Detail?Edr=" + e.key + "&SumStart=" + this.SumStart + "&SumEnd=" + this.SumEnd+ "&Date=" + formated_start_date, "_blank");
                }
            }
        });



    },
    createElement: function(tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach(key => element[key] = props[key]);
        if(children.length > 0) {
            children.forEach(child =>{
                element.appendChild(child);
            });
        } return element;
    },
    afterLoadDataHandler: function(data) {
        this.render();
    },
    destroy(){
    }
};
}());
