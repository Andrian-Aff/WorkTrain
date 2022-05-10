(function () {
    return {
        title: 'Группа 2',
        hint: 'Группа 2',

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
                code: "date",
                name: "Дата",
                type: "date",
                placeholder: "Дата",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 1,
                width: "50%"
            },
            {
                code: "time",
                name: "Время",
                type: "time",
                placeholder: "Время",
                hidden: false,
                fullScreen: false,
                required: false,
                position: 2,
                width: "50%"
            },
            {
                code: "textarea",
                name: "Новость",
                type: "textarea",
                placeholder: 'Новость',
                hidden: false,
                fullScreen: false,
                required: false,
                position: 3,
                rows: 10,
                width: "100%"
              },
        ],

        init: async function () {

            const data = {
                columns: [{ code: "textarea" }],
                rows: [{ values: ["Новость Новость Новость Новость Новость Новость Новость ..."] }]
            };
            setTimeout(() => { this.initFields(data) }, 1000);
        },

        afterViewInit: function () {



        },
        destroy: function () {
        },
    };
}());
