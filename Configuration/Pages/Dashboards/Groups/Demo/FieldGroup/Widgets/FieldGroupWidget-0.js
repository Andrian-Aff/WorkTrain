(function () {
  return {
    title: 'TITLE',
    hint: 'hint',

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
        code: "Name",
        name: "Назва",
        type: "text",
        placeholder: 'Назва',
        hidden: false,
        fullScreen: false,
        required: true,
        position: 1,
        width: "100%"
      },
      {
        code: "ShortName",
        name: "Коротка назва",
        type: "text",
        placeholder: 'Коротка назва',
        hidden: false,
        fullScreen: false,
        required: false,
        position: 2,
        width: "50%"
      },
      {
        code: "number",
        name: "number",
        type: "number",
        placeholder: 'number',
        hidden: false,
        fullScreen: false,
        required: false,
        position: 3,
        width: "50%"
      },
      {
        code: "checkbox",
        name: "checkbox",
        type: "checkbox",
        placeholder: "checkbox",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 4,
        width: "10%"
      },
      {
        code: "button",
        name: "button",
        type: "button",
        placeholder: "button",
        icon: "language",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 4,
        width: "20%"
      },
      {
        code: "select",
        name: "select",
        type: "select",
        placeholder: "select",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 5,
        listKeyColumn: "Id",
        listDisplayColumn: "Name",
        width: "20%",
        queryListCode: "selectrows",
        keyValue: 1,//можно задать по умолчанию
        value: "xxx", //можно задать по умолчанию
        filterList: [{ parameterCode: '@test1', parameterValue: "rest1" }]
      },
      {
        code: "password",
        name: "password",
        type: "password",
        placeholder: 'password',
        hidden: false,
        fullScreen: false,
        required: false,
        position: 6,
        width: "30%"
      },
      {
        code: "email",
        name: "email",
        type: "email",
        placeholder: 'email',
        hidden: false,
        fullScreen: false,
        required: false,
        position: 8,
        width: "30%"
      },
      {
        code: "textarea",
        name: "textarea",
        type: "textarea",
        placeholder: 'textarea',
        hidden: false,
        fullScreen: false,
        required: false,
        rows: 3,
        position: 9,
        width: "70%"
      },
      {
        code: "radio",
        name: "radio",
        type: "radio",
        placeholder: "radio",
        radioItems: [{ value: "string1", viewValue: "string1" }, { value: "string2", viewValue: "string2" }],
        hidden: false,
        fullScreen: false,
        required: false,
        position: 10,
        width: "20%"
      },
      {
        code: "date",
        name: "date",
        type: "date",
        placeholder: "date",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 11,
        width: "30%"
      },
      {
        code: "time",
        name: "time",
        type: "time",
        placeholder: "time",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 12,
        width: "30%"
      },
      {
        code: "lookup",
        name: "lookup",
        type: "lookup",
        placeholder: "lookup",
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
        width: "20%",
        queryListCode: "selectrows",
        keyValue: 1,//можно задать по умолчанию
        value: "xxx", //можно задать по умолчанию
        filterList: [{ parameterCode: '@test1', parameterValue: "rest1" }],
        hidden: false,
        fullScreen: false,
        required: false,
        position: 14,
        width: "100%"
      },
      {
        code: "image",
        name: "image",
        type: "image",
        placeholder: "image",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 15,
        height: "50px",
        width: "50%"
      },
      {
        code: "file",
        name: "file",
        type: "file",
        placeholder: "file",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 16,
        width: "30%",
        fileNameColumnCode: "fileNameColumnCode"
      },
      {
        code: "date-time",
        name: "date-time",
        type: "date-time",
        placeholder: "date-time",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 20,
        width: "100%"
      },
      {
        code: "systemUser",
        name: "systemUser",
        type: "systemUser",
        placeholder: "systemUser",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 17,
        width: "100%"
      }
    ],

    init: async function () {
      // const codeValues = [
      //   { code: "Name", value: "Namexxx" },
      //   { code: "number", value: 12345 }
      // ];
      // setTimeout(() => { this.initFields(codeValues) }, 1000);

      const data = {
        columns: [{ code: "Name" }, { code: "number" }],
        rows: [{ values: ["Nameyyy", 12345] }]
      };
      setTimeout(() => { this.initFields(data) }, 1000);
    },

    afterViewInit: function () {
      console.log("FORM afterFieldsInit");
      this.form.onControlIconClick("button", (e) => console.log("IconClick"));
      this.form.onControlValueChanged("number", (v) => console.log("onControlValueChanged "+ v));


      this.testSetControlValue();
      this.testDisableControl();

      const btnInfoAuto = document.getElementById("button");
      btnInfoAuto.addEventListener("click", () => {
        this.testGetControlValue();
        this.testSetControlParameterValues();
        this.testGetControlParameterValues();
        this.testGetControlValues();
        this.testSetControlValueByIndex();
        this.testSetControlVisibility();
        this.testSetControlRequirement();
        this.testSetControlTitle();
        this.testModalForm();
        this.testEnableControl();
        this.testRemoveControl();
        this.testAddControl();
        this.testGetControlDisplayValue();
      });
    },

    testSetControlValue() {
      this.form.setControlValue("ShortName", "Test set value");
      this.form.setControlValue('select', { key: 2, value: "Волинська" });
    },

    testGetControlValue() {
      const v = this.form.getControlValue("Name");
      console.log("testGetControlValue");
      console.log(v);
    },

    testSetControlParameterValues() {
      this.form.setControlParameterValues('select', [{ parameterCode: '@test2', parameterValue: "rest2" }]);
    },

    testSetControlParameterValues() {
      this.form.setControlParameterValues('select', [{ parameterCode: '@test2', parameterValue: "rest2" }]);
    },

    testGetControlParameterValues() {
      const v = this.form.getControlParameterValues("select");
      console.log("testGetControlParameterValues");
      console.log(v);
    },

    testGetControlValues() {
      const v = this.form.getControlValues();
      console.log("testGetControlValues");
      console.log(v);
    },

    testGetControlDisplayValue() {
      const v = this.form.getControlDisplayValue('select');
      const v2 = this.form.getControlDisplayValue('lookup');
      console.log("testGetControlDisplayValue");
      console.log(v);
      console.log(v2);
    },

    testSetControlValueByIndex() {
      this.form.setControlValueByIndex('select', 3);
    },

    testSetControlVisibility() {
      this.form.setControlVisibility('Name', false);
    },

    testSetControlRequirement() {
      this.form.setControlRequirement('ShortName', true);
    },

    testSetControlTitle() {
      this.form.setControlTitle('ShortName', "title");
    },

    testAddControl() {
      const control = {
        code: "fileAdd",
        name: "fileAdd",
        type: "file",
        placeholder: "fileAdd",
        hidden: false,
        fullScreen: false,
        required: false,
        position: 30,
        width: "30%",
        fileNameColumnCode: "fileNameColumnCode"
      };
      this.form.addControl(control);
    },

    testRemoveControl() {
      this.form.removeControl("file");
    },

    testEnableControl() {
      this.form.enableControl('number');
    },

    testDisableControl() {
      this.form.disableControl('number');
    },

    testModalForm: function () {
      const newDBConfig = {
        title: 'Нова файлова БД',
        acceptBtnText: 'save',
        cancelBtnText: 'exit',
        singleButton: false,
        fieldGroups: [
          {
            code: 'disk_group',
            name: '',
            expand: true,
            position: 1,
            fields: [
              {
                code: 'new_dbDisk',
                fullScreen: true,
                hidden: false,
                placeholder: 'Введіть диск',
                position: 1,
                required: true,
                type: 'text'
              }
            ]
          }
        ]
      };
      this.openModalForm(newDBConfig, this.newBaseCallBack.bind(this));
    },

    newBaseCallBack: function (response) {
      console.log("testModalForm");
      console.log(response)
      console.log(this.form);
    },

    destroy: function () {
    },
  };
}());
