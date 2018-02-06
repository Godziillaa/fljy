// pages/login/login.js
var app = getApp();
Page({
  data: {
    formloading:false
  },
  formSubmit:function(e){
    var _page=this, _data = e.detail.value;
    if(_data["username"]==''){
      app.alertFail({
        content: '请输入账号'
      });
      return false;
    }else if (_data["userpassword"] == '') {
      app.alertFail({
        content: '请输入密码'
      });
      return false;
    }else{
      _page.setData({
        formloading:true
      });
      var _session = app.getLocalData('third_session');
      app.request({
        url:'/user/bind_user',
        method:'POST',
        contentType:'application/x-www-form-urlencoded',
        data: {'third_session': _session, 'mobile': _data["username"], 'password': _data["userpassword"]},
        success:function(d){
          var _data=d.data;
          if (_data.flag==1){
            app.setLocalData('bind_statu',1);
            app.alertSuccess(_data.msg);
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/home/home'
              })
            }, 1500);
          }else{
            _page.setData({
              formloading: false
            });
            app.alertFail({
              content:_data.msg
            });
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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