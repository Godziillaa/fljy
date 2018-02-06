// pages/policylist/policylist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session: app.getLocalData('third_session'),
    statu:false,
    searchKey:false,
    openType: '',
    policy:false,
    pagenum:1,
    loadmore:true,
    loading:false,
    loadtip:'加载更多',
    searchTip: '输入搜索内容'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _page = this, _title = '', _openType = 'navigate', _statu = options.statu || false, _key = options.searchKey || false, _searchTip = _page.data.searchTip;
    if (_key){
      _title = '政策搜索';
      _openType ='redirect';
      _searchTip = _key;
    }else{
      if (_statu==1){
        _title = '已处理政策'
      }else{
        _title = '待处理政策'
      }
    }
    wx.setNavigationBarTitle({
      title: _title
    });
    _page.setData({
      statu: _statu,
      searchKey: _key,
      openType: _openType,
      searchTip: _searchTip
    });
    _page.loadMore();
  },
  loadMore:function(){
    var _page = this, _searchKey = _page.data.searchKey, _statu = _page.data.statu,  _pagenum = _page.data.pagenum || 1, _loadmore = _page.data.loadmore;
    _page.setData({
      loading: true,
      loadtip:'加载中',
      loadmore: false
    });
    var _postdata = {
      'third_session': _page.data.session,
      input_status: _statu,
      page: _pagenum
    }
    if (_searchKey) {
      _postdata = {
        'third_session': _page.data.session,
        keyword: _searchKey,
        page: _pagenum
      }
    }
    app.request({
      url: '/policy/list',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: _postdata,
      success: function (d) {
        var _data = d.data;
        if (_data.flag == 1) {
          var _list = _data.data.list, _end = _data.data.end;
          _page.setData({
            policy: _list
          });
          if (_end == 1) {
            _page.setData({
              loadmore: false,
              loadtip: '能给的都给了',
            });
          } else {
            _page.setData({
              loadmore: true,
              page: _pagenum + 1,
              loadtip: '加载更多',
            });
          }
        } else {
          app.alertFail({
            content: _data.msg
          });
          _page.setData({
            loadmore: true,
            page: _pagenum,
            loadtip: '加载更多',
          });
        }
      },
      complete:function(){
        _page.setData({
          loading: false
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