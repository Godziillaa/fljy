// pages/home/home.js
var app = getApp();
Page({
  data: {
    cDate:{},
    userInfo: {},
    lbs:{},
    mystores: false,
    policyDone: false,
    policyPending: false,
    storesDone: false,
    storesPending: false,
    realname:''
  },
  onLoad: function (options) {
    var _page = this;
    var cd=new Date(),_cDate={};
    _cDate.y=cd.getFullYear();
    _cDate.m=cd.getMonth()+1;
    _cDate.d=cd.getDate();
    _page.setData({
      cDate: _cDate
    });
    app.getUserInfo(function (uinfo, _code) {
      _page.setData({
        userInfo: uinfo
      });
      app.getLbs(function(lbs){
        var _session = app.getLocalData('third_session');
        app.request({
          url: '/index/salesman_info',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          data: { 'third_session': _session, latitude: lbs.latitude, longitude: lbs.longitude},
          success: function (d) {
            var _data = d.data;
            if (_data.flag == 1) {
              var _d = _data.data, _mystores = [];
              if (_d.shop.length) {
                for (var i in _d.shop) {
                  var _s = _d.shop[i];
                  _mystores.push(_s.name + ' - ' + _s.address);
                }
              } else {
                _mystores = false
              }
              _page.setData({
                realname: _d.realname,
                mystores: _mystores,
                policyDone: _d.policy_handle_num,
                policyPending: _d.policy_unhandle_num,
              });
            } else {
              app.alertFail({
                content: _data.msg
              });
            }
          }
        });
      });
    });
  },
  goUcenter:function(){
    app.slidePage('/pages/ucenter/ucenter');
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
    wx.stopPullDownRefresh()
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