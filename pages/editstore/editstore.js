// pages/editstore/editstore.js
var app = getApp();
Page({
  data: {
    session: app.getLocalData('third_session'),
    formloading:false,
    checkoption:{
      name: { name: '店名称', required: true , minlength: 3 , maxlength: 30 , special: true },
      linkman: { name: '联系人',required: true , minlength: 2 , maxlength: 30 , special: true },
      mobile: { name: '店铺电话',required: true , phone: true },
      address: { name: '店铺地址',required: true , minlength: 1 , maxlength: 100 }
    },
    store:false,
    category_index:'',
    category_name: '选择店铺分类',
    dealer_index: '',
    dealer_name: '选择经销商',
    categoryArry: [],
    objCategoryArry:[],
    dealerArry: [],
    objDealerArry: [],
    thumbArr: {
      thumb:[],
      original:[]
    },
    action:'/shop/edit_shop'
  },
  onLoad: function (options) {
    var _page = this;
    if(options.id=='new'){
      var _store={
        id: '-1',
        name: '',
        linkman: '',
        mobile: '',
        category_id: '',
        dealer_id: '',
        address: '',
        address_desc: '',
        city: '',
        district: '',
        latitude: '',
        longitude: '',
        nation: '',
        province: '',
        street: '',
        street_number: '',
        shop_images: [],
        remarks: ''
      }
      _page.setData({
        store: _store,
        action:'/shop/add_shop'
      });
      wx.setNavigationBarTitle({
        title: '新建终端店'
      });
    }else{
      var _id = options.id
      app.request({
        url: '/shop/info',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: { 'third_session': _page.data.session, id:_id},
        success: function (res) {
          var _data = res.data;
          if (_data.flag) {
            // console.log(_data.data)
            var _store = _data.data;
            // var _store = {
            //   id: '123',              
            //   name: '金辉大厦全时便利店',
            //   linkman: '孙悟空',
            //   mobile: '13900000000',
            //   category_id: '18',
            //   dealer_id: '5',
            //   address:'北京市朝阳区日坛北街33号',
            //   address_desc: '3层',
            //   city:'北京市',
            //   district:'朝阳区',
            //   latitude:'39.9219',
            //   longitude:'116.44355',
            //   nation:'中国',
            //   province:'北京市',
            //   street:'日坛北街',
            //   street_number:'日坛北街33号',
            //   shop_images: ['https://fenglianpms.hui-jia.com.cn/public/uploads/big_img/5a7194ea46960.jpeg'],
            //   remarks: '备注备注备注'
            // }
            var _thumbArr={}, _thumb = [], _original=[]
            for (var i in _store.shop_images){
              var _org = _store.shop_images[i], _thb = _org.replace(/big_img/,'small_img');
              _original.push(_org);
              _thumb.push(_thb);
            }
            _thumbArr.thumb = _thumb;
            _thumbArr.original = _original;
            _page.setData({
              store: _store,
              thumbArr: _thumbArr
            });
          }
        }
      });
    }
    var _objCategoryArry = [], _categoryArry = []
    app.request({
      url: '/shop/categories',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: { 'third_session': _page.data.session },
      success: function (res) {
        var _data = res.data;
        if (_data.flag) {
          _objCategoryArry = _data.data;
          for (var i in _data.data) {
            _categoryArry.push(_data.data[i].name);
          }
          _page.setData({
            objCategoryArry: _objCategoryArry,
            categoryArry: _categoryArry
          });
          var _store=_page.data.store, _cat = _page.data.objCategoryArry, _category_name = '选择店铺分类', _category_index = '';
          for (var i in _cat) {
            if (_cat[i].id == _store.category_id) {
              _category_name = _cat[i].name;
              _category_index = i;
              break;
            }
          }
          _page.setData({
            category_index: _category_index,
            category_name: _category_name
          });
        } else {
          app.alertFail({
            content: _data.msg
          })
        }
      }
    });
    var _objDealerArry = [], _dealerArry = []
    app.request({
      url: '/dealer/list',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: { 'third_session': _page.data.session },
      success: function (res) {
        var _data = res.data;
        if (_data.flag) {
          var _d = _data.data;
          _objDealerArry = _d;
          for (var i in _d) {
            var _val = _d[i].dealername + '，' + _d[i].linktel + '，' + _d[i].address;
            _dealerArry.push(_val);
          }
          _page.setData({
            objDealerArry: _objDealerArry,
            dealerArry: _dealerArry
          });
          var _store = _page.data.store, _dealer = _page.data.objDealerArry, _dealer_name = '选择经销商', _dealer_index = '';
          for (var i in _dealer) {
            if (_dealer[i].id == _store.dealer_id) {
              _dealer_name = _dealer[i].dealername;
              _dealer_index = i;
              break;
            }
          }
          _page.setData({
            dealer_index: _dealer_index,
            dealer_name: _dealer_name
          });
        } else {
          app.alertFail({
            content: _data.msg
          });
        }
      }
    });
  },
  formSubmit:function(e){
    var _page = this, _store=_page.data.store;
    app.formSubmit(e, _page, function(){
      app.request({
        url: _page.data.action,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: { 'third_session': _page.data.session, 'data': JSON.stringify(_store)},
        success: function (res) {
          console.log(res)
          var _data = res.data;
          if (_data.flag) {
            app.setLocalData('reload_store', 1);
            app.alertSuccess(_data.msg);
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500);
          }else{
            app.alertFail({
              content: _data.msg
            })
          }
        },
        complete:function(){
          _page.setData({
            formloading: false
          });
        }
      });
    })
  },
  categoryChange:function(e){
    var _page = this, _index = e.detail.value, _cat = _page.data.objCategoryArry, _category_id = _cat[_index]['id'], _category_name = _cat[_index]['name'], _store=_page.data.store;
    _store.category_id=_category_id;
    _page.setData({
      store: _store,
      category_index: _index,
      category_name: _category_name
    });
  },
  dealerChange: function (e) {
    var _page = this, _index = e.detail.value, _dealer = _page.data.objDealerArry[_index], _dealer_id = _dealer.id, _dealer_name = _dealer.dealername, _store = _page.data.store;
    _store.dealer_id = _dealer_id;
    _page.setData({
      store: _store,
      dealer_index: _index,
      dealer_name: _dealer_name
    })
  },
  chooseAddress:function(){
    var _page = this, _store = _page.data.store;
    app.chooseLbs(function(_obj){
      console.log(_obj);
      for (var key in _obj){
        _store[key] = _obj[key]
      }
      _page.setData({
        store: _store
      })
    });
  },
  prviewthumb: function (e) {
    var _data = e.target.dataset;
    // console.log(_data.src, _data.arr)
    app.prviewimg(_data.src, _data.arr);
  },
  addThumb:function(e){
    var _page = this, _store = _page.data.store, _thumbArr = _page.data.thumbArr, _shop_images = _store.shop_images || [], _max = 9 - _shop_images.length;
    app.chooseThumb({
      max:1,
      success:function(res){
        app.upload({
          url: '/shop/upload',
          file: res[0],
          success:function(res){
            var data = JSON.parse(res.data);
            if(data.flag){
              var obj = data.data;
              console.log(obj);
              _shop_images.push(obj.big_img);
              _thumbArr.original.push(obj.big_img);
              _thumbArr.thumb.push(obj.thumb_img);
              _store.shop_images = _shop_images;
              _page.setData({
                store: _store,
                thumbArr: _thumbArr
              })
            }else{
              app.alertFail({
                content: data.msg
              })
            }
          }
        });
      }
    });
  },
  removeThumb:function(e){
    var _page = this, _index = e.target.dataset.index, _store = _page.data.store, _thumbArr = _page.data.thumbArr;
    _store.shop_images.splice(_index, 1);
    _thumbArr.thumb.splice(_index, 1);
    _thumbArr.original.splice(_index, 1);
    console.log(_thumbArr, _store)
    _page.setData({
      store: _store,
      thumbArr: _thumbArr
    });
  },
  inputBlur: function(e){
    var _page = this, _key = e.target.dataset.name, _val = e.detail.value, _store = _page.data.store;
    _store[_key] = _val;
    _page.setData({
      store: _store
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