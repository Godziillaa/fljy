// pages/research/research.js
var app = getApp();
Page({
  data: {
    history:false,
    fn:false
  },
  onLoad: function (options) {
    var _page=this, _title=options.title||'搜索',_fn=options.fn, _history=false;
    if (_fn=='policy'){
      _history = (app.getLocalData('_policyHistory')) ? app.getLocalData('_policyHistory').split(",") : false;
    } else if (_fn == 'shop'){
      _history = (app.getLocalData('_shopHistory')) ? app.getLocalData('_shopHistory').split(",") : false;
    }
    _page.setData({
      history: _history,
      fn: _fn
    });
    wx.setNavigationBarTitle({
      title: _title
    });
  },
  searchFn:function(e){
    var _page = this, _history = _page.data.history || [], _fn = _page.data.fn, _key = app.trim(e.detail.value.key);
    if (_key){
      for (var i in _history){
        if (_history[i] == _key){
          _key = _history.splice(i, 1);
          break;
        }
      }
      _history.unshift(_key);
      if (_fn == 'policy') {
        app.setLocalData('_policyHistory', _history.toString());
        app.goSearch('/pages/policylist/policylist?searchKey=' + _key);
      } else if (_fn == 'shop') {
        app.setLocalData('_shopHistory', _history.toString());
        app.goSearch('/pages/stores/stores?searchKey=' + _key);
      }
    }
  },
  historyTap:function(e){
    var _page = this, _history = _page.data.history || [], _key = e.target.dataset.key, _fn = _page.data.fn;
    for (var i in _history) {
      if (_history[i] == _key) {
        _key = _history.splice(i, 1);
        break;
      }
    }
    _history.unshift(_key);
    if (_fn == 'policy') {
      app.setLocalData('_policyHistory', _history.toString());
      app.goSearch('/pages/policylist/policylist?searchKey=' + _key);
    } else if (_fn == 'shop') {
      app.setLocalData('_shopHistory', _history.toString());
      app.goSearch('/pages/stores/stores?searchKey=' + _key);
    }
  },
  clearHistory:function(){
    var _page = this, _fn = _page.data.fn;
    if (_fn == 'policy') {
      app.setLocalData('_policyHistory', false);
    } else if (_fn == 'shop') {
      app.setLocalData('_shopHistory', false);
    }
    _page.setData({
      history:false
    })
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