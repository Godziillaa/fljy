// pages/policybind/policybind.js
Page({
  data: {
    policy: {
      id: '123',
      start: '2018年8月1日',
      end: '2018年10月1日',
      name: '返现金优惠政策',
      item: ['板城爱烧锅\板城和顺【6年】', '板城爱烧锅\板城和顺【5年】', '板城爱烧锅\板城和顺【4年】'],
      store: ['金辉大厦-全时便利店', '绿地中心-快捷键便利店','望京SOHO-好运来酒水专供'],
      operator: '闹着玩',
      policyType: '现金',
      amount: '100元',
      list: [
        {
          store: '金辉大厦-全时便利店',
          item: ['板城爱烧锅\板城和顺【6年】X 4', '板城爱烧锅\板城和顺【5年】X 6']
        },
        {
          store: '绿地中心-快捷键便利店',
          item: ['板城爱烧锅\板城和顺【4年】X 3']
        },
        {
          store: '望京SOHO-好运来酒水专供',
          item: [ '板城爱烧锅\板城和顺【5年】X 6']
        }
      ]
    }
  },
  onLoad: function (options) {
    
  },
  sacnstorecode:function(){
    var _page=this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.showLoading({
          title: '核对中..',
          mask: true
        })
        setTimeout(function(){
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/instore/instore',
          })
        },2000);
      }
    })
  },
  submitdata: function () {
    wx.showLoading({
      title: '保存中..',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      })
    }, 2000);
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