(function () {
  return {
    init: function () {
      this.queryParams(this.onloadQueryParams, this);
    },

    onloadQueryParams: function (params) {
      console.log(params);
    }
  };
}());
