(function () {
  return {
    title: '',
    hint: '',
    //formatTitle: function() {},
    customConfig:
      `
      <div class="main-block-controls">

        <div class="block-control">
          <label class="control-text-label" for="text-input">Название формы</label><br>
          <input class="control-text-input" type="text" id="text-input" placeholder="Подсказка для ввода"><br>
          <small>Подсказка поля: Введите правильную информацию</small>
        </div>

        <div class="block-control">
          <label class="control-text-label" for="text-input-error">Название формы <b style="color: #ad3838">*</b></label><br>
          <input class="control-text-input-error" type="text" id="text-input-error" placeholder="Подсказка для ввода" value="Error!!!"><br>
          <small>Подсказка поля: Введите правильную информацию</small>
        </div>

      </div>
      `
    ,


    init: async function () {
    },
    afterViewInit: async function () {
    },
    destroy: function () {
    }
  };
}());
