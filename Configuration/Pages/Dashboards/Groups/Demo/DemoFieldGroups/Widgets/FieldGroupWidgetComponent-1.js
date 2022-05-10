(function () {
    return {
        title: 'Группа 1',
        hint: 'Группа 1',

        formatTitle: function () {
            const style = {};
            style["height"] = "50px";
            style["display"] = "flex";
            style["align-items"] = "center";
            style["justify-content"] = "center";
            return style;
        },

        fields: [
            {
                code: "buttonSave",
                name: "Сохранить",
                type: "button",
                placeholder: "Сохранить",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 1,
                width: "50%"
            },
            {
                code: "buttonCancel",
                name: "Отменить",
                type: "button",
                placeholder: "Отменить",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 2,
                width: "50%"
            },
            {
                code: "Name",
                name: "Имя",
                type: "text",
                placeholder: 'Имя',
                hidden: false,
                fullScreen: false,
                required: true,
                position: 3,
                width: "50%"
            },
            {
                code: "number",
                name: "Номер",
                type: "number",
                placeholder: 'Номер',
                hidden: false,
                fullScreen: false,
                required: false,
                position: 4,
                width: "50%"
            },
            {
                code: "select",
                name: "Область",
                type: "select",
                placeholder: "Область",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 6,
                listKeyColumn: "Id",
                listDisplayColumn: "Name",
                width: "40%",
                queryListCode: "selectrows",
                keyValue: 1,//можно задать по умолчанию
                value: "xxx", //можно задать по умолчанию
                filterList: [{ parameterCode: '@test1', parameterValue: "rest1" }]
            },
            {
                code: "lookup",
                name: "Область",
                type: "lookup",
                placeholder: "Область",
                lookupType: "list", //tree
                listParentIdColumn: '',
                data: [],
                querySearchListCode: '',
                searchListKeyColumn: '',
                searchListDisplayColumn: '',
                pathColumn: '',
                hasChildrenColumnCode: '',
                listKeyColumn: "Id",
                listDisplayColumn: "Name",
                queryListCode: "selectrows",
                keyValue: 1,//можно задать по умолчанию
                value: "xxx", //можно задать по умолчанию
                filterList: [{ parameterCode: '@test1', parameterValue: "rest1" }],
                hidden: false,
                fullScreen: false,
                required: false,
                position: 7,
                width: "50%"
            },
            {
                code: "date-time",
                name: "Дата",
                type: "date-time",
                placeholder: "Дата",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 8,
                width: "50%"
            },
            {
                code: "radio",
                name: "Пол",
                type: "radio",
                placeholder: "Пол",
                radioItems: [{ value: 1, viewValue: "Мужчина" }, { value: 0, viewValue: "Женщина" }],
                hidden: false,
                fullScreen: false,
                required: false,
                position: 9,
                width: "50%"
            },
            {
                code: "password",
                name: "Пароль",
                type: "password",
                placeholder: 'Пароль',
                hidden: false,
                fullScreen: false,
                required: false,
                position: 10,
                width: "100%"
              },
              {
                code: "email",
                name: "Почта",
                type: "email",
                placeholder: 'Почта',
                hidden: false,
                fullScreen: false,
                required: false,
                position: 11,
                width: "100%"
              },
            {
                code: "checkbox",
                name: "Принять",
                type: "checkbox",
                placeholder: "Принять",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 12,
                width: "50%"
            },
        ],

        init: async function () {
            const data = {
                columns: [{ code: "Name" }, { code: "number" }],
                rows: [{ values: ["Иван", 12345] }]
            };
            setTimeout(() => { this.initFields(data) }, 1000);
        },

        afterViewInit: function () {



        },
        destroy: function () {
        },
    };
}());
