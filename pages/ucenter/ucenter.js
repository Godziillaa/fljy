// pages/ucenter/ucenter.js
var app=getApp();
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  logout:function(){
    // app.setLocalData('third_session',false);
    // console.log(app.getLocalData('third_session'))
    var _session = app.getLocalData('third_session');
    app.request({
      url: '/user/logout',
      method: 'POST',
      data: { 'third_session': _session },
      contentType: 'application/x-www-form-urlencoded',
      success: function (d) {
        var _data = d.data;
        if (_data.flag == 1) {
          app.alertSuccess(_data.msg);
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }, 1500);
        } else {
          app.alertFail({
            content: _data.msg
          });
        }
      }
    });
  },
  unbindAccount:function(){
    app.confirm({
      content:'您确定要解除该业务账号与微信号的绑定关系嘛',
      success:function(){
        var _session = app.getLocalData('third_session');
        app.request({
          url: '/user/unbind_user',
          method: 'POST',
          data: { 'third_session': _session},
          contentType: 'application/x-www-form-urlencoded',
          success: function (d) {
            var _data = d.data;
            if (_data.flag == 1) {
              app.setLocalData('bind_statu',false);
              app.alertSuccess(_data.msg);
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/login/login'
                });
              }, 1500);
            } else {
              app.alertFail({
                content: _data.msg
              });
            }
          }
        });
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