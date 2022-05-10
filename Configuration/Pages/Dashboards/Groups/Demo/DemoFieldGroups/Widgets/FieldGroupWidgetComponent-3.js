(function () {
    return {
        title: 'Группа 3',
        hint: 'Группа 3',

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
                code: "buttonSave_g3",
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
                code: "buttonCancel_g3",
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
                code: "Name_g3",
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
                code: "number_g3",
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
                code: "select_g3",
                name: "Область",
                type: "select",
                placeholder: "Область",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 5,
                listKeyColumn: "Id",
                listDisplayColumn: "Name",
                width: "40%",
                queryListCode: "selectrows",
                keyValue: 1,//можно задать по умолчанию
                value: "xxx", //можно задать по умолчанию
                filterList: [{ parameterCode: '@test1', parameterValue: "rest1" }]
            },
            {
                code: "lookup_g3",
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
                position: 6,
                width: "50%"
            },
            {
                code: "date-time_g3",
                name: "Дата",
                type: "date-time",
                placeholder: "Дата",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 7,
                width: "50%"
            },
            {
                code: "radio_g3",
                name: "Пол",
                type: "radio",
                placeholder: "Пол",
                radioItems: [{ value: 1, viewValue: "Мужчина" }, { value: 0, viewValue: "Женщина" }],
                hidden: false,
                fullScreen: false,
                required: false,
                position: 8,
                width: "50%"
            },
            {
                code: "password_g3",
                name: "Пароль",
                type: "password",
                placeholder: 'Пароль',
                hidden: false,
                fullScreen: false,
                required: false,
                position: 9,
                width: "100%"
              },
              {
                code: "email_g3",
                name: "Почта",
                type: "email",
                placeholder: 'Почта',
                hidden: false,
                fullScreen: false,
                required: false,
                position: 10,
                width: "100%"
              },
            {
                code: "checkbox_g3",
                name: "Принять",
                type: "checkbox",
                placeholder: "Принять",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 11,
                width: "50%"
            },
            {
                code: "date_g3",
                name: "Дата",
                type: "date",
                placeholder: "Дата",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 12,
                width: "50%"
            },
            {
                code: "time_g3",
                name: "Время",
                type: "time",
                placeholder: "Время",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 13,
                width: "50%"
            },
            {
                code: "textarea_g3",
                name: "Новость",
                type: "textarea",
                placeholder: 'Новость',
                hidden: false,
                fullScreen: false,
                required: false,
                position: 14,
                rows: 10,
                width: "100%"
              },
        ],

        init: async function () {
            const data = {
                columns: [{ code: "Name_g3" }, { code: "number_g3" },{ code: "textarea" }],
                rows: [{ values: ["Иван", 12345, "Новость Новость Новость Новость Новость Новость Новость ..."] }]
            };
            setTimeout(() => { this.initFields(data) }, 1000);
        },

        afterViewInit: function () {



        },
        destroy: function () {
        },
    };
}());
