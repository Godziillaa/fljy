// pages/policydetail/policydetail.js
var app = getApp();
Page({
  data: {
    session: app.getLocalData('third_session'),
    policy:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _page = this, _id = options.id;
    var _postdata = {
      'third_session': _page.data.session,
      id: _id
    }
    app.request({
      url: '/policy/detail',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: _postdata,
      success: function (d) {
        var _data = d.data;
        if (_data.flag == 1) {
          console.log(_data.data)
          _page.setData({
            policy: _data.data
          });
        } else {
          app.alertFail({
            content: _data.msg
          });
        }
      }
    });
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