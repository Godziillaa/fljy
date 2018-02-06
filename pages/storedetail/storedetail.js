// pages/editstore/editstore.js
var app = getApp();
Page({
  data: {
    session: app.getLocalData('third_session'),
    formloading: false,
    store: false,
    thumbArr: {
      thumb: [],
      original: []
    }
  },
  onLoad: function (options) {
    var _page = this;
    var _id = options.id
    app.request({
      url: '/shop/info',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: { 'third_session': _page.data.session, id: _id },
      success: function (res) {
        var _data = res.data;
        if (_data.flag) {
          var _store = _data.data;
          var _thumbArr = {}, _thumb = [], _original = [];
          for (var i in _store.shop_images) {
            var _org = _store.shop_images[i], _thb = _org.replace(/big_img/, 'small_img');
            _original.push(_org);
            _thumb.push(_thb);
          }
          _thumbArr.thumb = _thumb;
          _thumbArr.original = _original;
          _page.setData({
            store: _store,
            thumbArr: _thumbArr
          });
          console.log(_store, _thumbArr)
        }
      }
    });
  },
  prviewthumb: function (e) {
    var _data = e.target.dataset;
    // console.log(_data.src, _data.arr)
    app.prviewimg(_data.src, _data.arr);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})