(function () {
  return {
    title: '',
    hint: '',
    //formatTitle: function() {},
    customConfig:
      `<div class="panel">
      <h3>Test jpg</h3>
      <img class="size" src="/modules/res/test.jpg">
  </div>
  <div class="panel">
      <h3>Test jpeg</h3>
      <img class="size" src="/modules/res/test.jpeg">
  </div>
  <div class="panel">
      <h3>Test svg</h3>
      <img class="size" src="/modules/res/test.svg">
  </div>
  <div class="panel">
      <h3>Test png</h3>
      <img class="size" src="/modules/res/test.png">
  </div>
  <div class="panel">
      <h3>Test pdf</h3>
      <p>PDF file <a href="/modules/res/test.pdf">open</a>.</p>
  </div>
  <div class="panel">
      <h3>Test ico</h3>
      <img class="size" src="/modules/res/test.ico">
  </div>
  <div class="panel test-svg">
      <h3>Test svg by style</h3>
  </div>
  <div class="panel">
      <h3>Test mp3</h3>
      <audio controls src="/modules/res/test.mp3"></audio>
  </div>`
    ,

    subs: [],

    init: async function () {
    },

    load: function (data) { },

    afterViewInit: async function () {

    },

    destroy: function () {
    },
  };
}());
