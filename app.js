//app.js
App({

  globalData: {
    userInfo: null,
    code: null,
    nowlbs: null,
    API: 'https://fenglianpms.hui-jia.com.cn/index.php?r=api'
  },
  onLaunch: function () {
    var app=this,logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    app.checkbind();
  },
  checkbind:function(){
    var app = this, _session = app.getLocalData("third_session");
    if (!_session) {
      app.getUserInfo(function (userInfo, _code) {
        console.log(_code)
        app.request({
          url: '/user/check_bind',
          data: { code: _code },
          success: function (d) {
            var _data = d.data;
            if (_data.flag == 1) {
              app.setLocalData('third_session', _data.data.third_session);
              app.setLocalData("bind_statu", _data.data.bind_statu);
              app.checkLogin();
            } else {
              app.alertFail({
                content: _data.msg
              })
            }
          }
        });
      })
    }else{
      app.checkLogin();
    }
  },
  checkLogin: function(){
    var app = this, _bind = app.getLocalData("bind_statu");
    if(!_bind) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }else{
      wx.redirectTo({
        url: '/pages/home/home'
      })
    }
  },
  changepage: function (obj) {
    var _url = (typeof obj == 'string') ? obj : obj.target.dataset.url;
    wx.navigateTo({
      url: _url
    })
  },

  getUserInfo:function(callback){
    var app = this;
    if(app.globalData.userInfo){
      typeof callback == "function" && callback(app.globalData.userInfo, app.globalData.code)
    }else{
      wx.login({
        success: function (_code) {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              typeof callback == "function" && callback(app.globalData.userInfo, _code.code);
            }
          })
        }
      })
    }
  },
  getLbs:function(lb){
    var app = this;
    if(this.globalData.nowlbs){
      typeof lb == "function" && lb(this.globalData.nowlbs)
    }else{
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          app.globalData.nowlbs = res;
          typeof lb == "function" && lb(app.globalData.nowlbs)
        }
      });
    }
  },
  formSubmit: function (e, _page,callback) {
    var _checkoption = _page.data.checkoption || false, _valArr = e.detail.value;
    if (_checkoption) {
      for (var key in _valArr) {
        var _val = (_valArr[key].toString()).replace(/(^\s*)|(\s*$)/g, ""), _option = _checkoption[key] || false;
        if (_option) {
          var _name = _option['name'];
          for (var _key in _option) {
            switch (_key) {
              case 'required':
                if (_option['required']) {
                  if (_val == null || _val == "") {
                    wx.showModal({
                      title: '提示',
                      content: '请输入' + _name,
                      showCancel: false
                    });
                    return false;
                  }
                }
                break
              case 'minlength':
                var _len = _option['minlength']
                if (_val.length < _len) {
                  wx.showModal({
                    title: '提示',
                    content: _name + '不能少于' + _len + '个字符',
                    showCancel: false
                  });
                  return false;
                }
                break
              case 'maxlength':
                var _len = _option['maxlength']
                if (_val.length > _len) {
                  wx.showModal({
                    title: '提示',
                    content: _name + '不能多于' + _len + '个字符',
                    showCancel: false
                  });
                  return false;
                }
                break
              case 'special':
                var regex = new RegExp("[\?@#$%\^&\*\(\)\{\}_+]");
                if (regex.test(_val)) {
                  wx.showModal({
                    title: '提示',
                    content: _name + '不能含有特殊字符',
                    showCancel: false
                  });
                  return false;
                }
                break
            }
          }
        }
      }
    }
    _page.setData({
      formloading: true
    });
    setTimeout(function () {
      (!!callback) && callback();
    }, 1000)
  },
  prviewimg: function (_current,_arr) {
    wx.previewImage({
      current: _current, // 当前显示图片的http链接
      urls: _arr, // 需要预览的图片http链接列表
      success: function (res) {
        // console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  chooseThumb:function(obj){
    wx.chooseImage({
      count: obj.max || 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        (!!obj.success) && obj.success(tempFilePaths);
      }
    })
  },
  chooseLbs: function (callback) {
    var app = this;
    wx.chooseLocation({
      success: function (res) {
        app.request({
          url: '/index/geocoder',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          data: { 'third_session': app.getLocalData("third_session"), latitude: res.latitude, longitude: res.longitude },
          success: function (_d) {
            var _data = _d.data;
            if (_data.flag) {
              var region = _data.data;
              region.latitude = res.latitude;
              region.longitude = res.longitude;
              (!!callback) && callback(_data.data);
            }else{
              app.alertFail({
                content: _data.msg
              })
            }
          }
        });
      }
    })
  },
  request:function(obj){
    wx.showNavigationBarLoading();
    var app=this;
    var _url = app.globalData.API + obj.url, _method = obj.method || 'GET', _data = obj.data || {}, _dataType = 'json', _contentType = obj.contentType||'application/json';
    wx.request({
      url: _url,
      method: _method,
      dataType: _dataType,
      data: _data,
      header: {
        'content-type': _contentType
      },
      success: function(d){
        (!!obj.success) && obj.success(d);
      },
      complete:function(){
        wx.hideNavigationBarLoading();
        (!!obj.complete) && obj.complete();
      }
    })
  },
  upload:function(obj){
    wx.showLoading({
      title: '上传中',
    })
    var app=this;
    var _url = app.globalData.API + obj.url, _file = obj.file;
    wx.uploadFile({
      url: _url,
      filePath: _file,
      name: 'file',
      formData: {
        'third_session': app.getLocalData("third_session"),
      },
      complete:function(){
        wx.hideLoading();
      },
      success: function (res) {
        (!!obj.success) && obj.success(res);
      }
    })
  },
  alertFail(obj){
    var _title=obj.title||'提示',_content=obj.content||'';
    wx.showModal({
      title: _title,
      content: _content,
      showCancel: false
    });
  },
  alertSuccess:function(msg){
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  },
  confirm:function(obj){
    wx.showModal({
      title: obj.title||'提示',
      content: obj.content || '确定执行此操作吗',
      success: function (res) {
        if (res.confirm) {
          (!!obj.success) && obj.success();
        }
      }
    })
  },
  setLocalData:function(_key,_val){
    wx.setStorageSync(_key, _val);
  },
  getLocalData: function (_key) {
    return wx.getStorageSync(_key);
  },
  goSearch: function(_url){
    wx.redirectTo({
      url: _url
    })
  },
  placePage:function(_url){
    wx.redirectTo({
      url: _url
    })
  },
  slidePage:function(_url){
    wx.navigateTo({
      url: _url
    })
  },
  trim:function(_str){
    return _str.replace(/^\s+|\s+$/gm, '');
  }
})