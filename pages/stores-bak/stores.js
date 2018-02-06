// pages/dealers/dealers.js
var app = getApp();
Page({
  data: {
    session: app.getLocalData('third_session'),
    statu: false,
    searchKey: false,
    openType: '',
    list: false,
    pagenum: 1,
    loadmore: true,
    loading: false,
    loadtip: '加载更多',
    delindex:'-1',
    searchTip:'输入搜索内容'
  },

  onLoad: function (options) {
    var _page = this, _title = '', _openType = 'navigate', _statu = options.statu || false, _key = options.searchKey || false, _searchTip = _page.data.searchTip;
    if (_key) {
      _title = '店铺搜素';
      _openType = 'redirect';
      _searchTip = _key;
    } else {
      if (_statu == 1) {
        _title = '已审核店铺';
      } else {
        _title = '待审核店铺';
        var _handle=null;
        clearInterval(_handle);
        _handle=setInterval(function(){
          var _reload = app.getLocalData("reload_store");
          if (_reload==1){
            app.setLocalData("reload_store", 0);
            _page.setData({
              pagenum: 1
            });
            _page.loadMore();
          }
        },1000);
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
  loadMore: function () {
    var _page = this, _searchKey = _page.data.searchKey, _statu = _page.data.statu, _pagenum = _page.data.pagenum || 1, _loadmore = _page.data.loadmore;
    _page.setData({
      loading: true,
      loadtip: '加载中',
      loadmore: false
    });
    var _postdata = {
      'third_session': _page.data.session,
      status: _statu,
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
      url: '/shop/list',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: _postdata,
      success: function (d) {
        var _data = d.data;
        if (_data.flag == 1) {
          var _list = _data.data.list, _end = _data.data.end;
          _page.setData({
            list: _list
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
      complete: function () {
        _page.setData({
          loading: false
        });
      }
    });
  },
  calldel:function(e){
    var _page = this, _ind = e.target.dataset.index;
    _page.setData({
      delindex: _ind
    });
  },
  cancelpress:function(){
    var _page = this;
    _page.setData({
      delindex: '-1'
    });
  },
  delStore:function(e){
    var _page = this, _list=_page.data.list, _tar = e.target.dataset, _ind = _tar.index, _id = _tar.id;
    app.confirm({
      content:'确定删除当前终端店吗',
      success:function(){
        wx.showLoading({
          title: '删除中',
        })
        app.request({
          url: '/shop/delete',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          data: { 'third_session': _page.data.session, id: _id },
          success: function (d) {
            var _data = d.data;
            if (_data.flag == 1) {
              for(var i in _list){
                if (_list[i].id == _id){
                  _list.splice(i, 1);
                  break;
                }
              }
              app.alertSuccess(_data.msg);
              _page.setData({
                list: _list,
                delindex:'-1'
              });
            } else {
              app.alertFail({
                content: _data.msg
              });
            }
          },
          complete: function () {
            wx.hideLoading();
          }
        });
      }
    });
  },
  changepage:function(e){
    app.changepage(e);
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