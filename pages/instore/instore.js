// pages/instore/instore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentstore:'金辉大厦-全时便利店',
    verifyPositon:false,
    item:[
      {
        id:'123',
        code:'SABC12345',
        name:'板城烧锅·无甄【三星】42° 6瓶'
      },
      {
        id: '234',
        code: 'SABC32432',
        name: '板城烧锅·无甄【五星】42° 6瓶'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
          _page.setData({
            currentstore:'绿地中心-快捷键便利店',
            verifyPositon:true
          })
        },2000);
      }
    })
  },
  delitem:function(e){
    var _page = this, _item=_page.data.item||[], _id = e.target.dataset.id;
    for(var i in _item){
      var obj=_item[i];
      if (obj.id == _id){
        _item.splice(i, 1);
      }
    }
    _page.setData({
      item:_item
    })
  },
  sacnitem:function(){
    var _page = this, _item = _page.data.item || [];
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.showLoading({
          title: '获取数据中..',
          mask: true
        })
        setTimeout(function () {
          wx.hideLoading();
          _item.push({id: '768',code: 'SABC33333',name: '板城和顺【五星】52° 6瓶'})
          _page.setData({
            item: _item
          })
        }, 2000);
      }
    })
  },

  backbtn:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  submitdata:function(){
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