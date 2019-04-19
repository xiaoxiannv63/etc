const app = getApp();
Page({
  data: {
    time: '发送验证码',
    disabled: true,
    disabled2: true,
    disabledAccout:true,
    disabledAccout2:true,
    agree: false,
    currentTime: 60,
    interval: null,
    modalOpened: false,
    loginType:"tel"
  },
  onLoad() {
    console.log(app,'app')
  },
  onUnload() {
    // 页面被关闭
    clearInterval(this.data.interval)
  },
  getCode: function (options) {//获取验证码
    var that = this;
    var currentTime = that.data.currentTime;
    that.setData({
      time: '重新发送' + currentTime,
      disabled: true
    })
    this.data.interval = setInterval(function () {
      that.setData({
        time: '重新发送' + (currentTime - 1),
        disabled: true
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(that.data.interval)
        that.setData({
          time: '重新获取',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
    //
    let json1 = {
      cmd: 'LOGIN',
      mobile: this.data.tel,
      userId: app.userInfo.userId,
      channel: 'ZFBPIAOGEN'
    }
    app.ajax(json1, "VALIDCODE", function (data) {
      // console.log(data)
      // my.navigateBack({});
    })
  },
  inpTel(e) {
    let tel = e.detail.value;
    if (tel.length != 11) {
      this.setData({
        disabled: true
      })
    } else {
      this.setData({
        disabled: false
      })
    }
    this.setData({
      tel: tel
    })
    this.judgeBtn2()
  },
  inputAccout(e){
    let accout = e.detail.value
    if(accout){
      this.setData({
        disabledAccout:false
      })
    }
  },
  inputPassword(e){
    let accout = e.detail.value
    if(accout){
      this.setData({
        disabledAccout2:false
      })
    }
  },
  inpCode(e) {
    this.setData({
      code: e.detail.value
    })
    this.judgeBtn2()
  },
  judgeBtn2() {

    if (!!this.data.tel && this.data.tel.length == 11 && !!this.data.code && !!this.data.agree) {
      this.setData({
        disabled2: false
      })
    } else {
      this.setData({
        disabled2: true
      })
    }
  },
  agree(e) {
    this.setData({
      agree: e.detail.value
    })
    this.judgeBtn2();
  },
  queding(e) {
    // my.reLaunch({
    //   url: "/pages/index/index", // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
    // });
    // my.alert({'title':'确定验证码登录，点击确定'})
    var json1 = {
      mobile:this.data.tel,
      validCode:this.data.code,
      userId:app.userInfo.userId,
      loginType:'VALIDCODE',
      channel:'ZFBPIAOGEN'
    }
    app.ajax(json1,"REGISTER",function(data){
      if(!!data.ticketId){
        app.userInfo.ticketId = data.ticketId;
        app.userInfo.pssUserId = data.pssUserId;
        let json2 = {
          userId:app.userInfo.userId,
          channel:'ZFBPIAOGEN'
        }
        app.ajax(json2,'LOGIN',function(data){
          app.userInfo.pssUserId = data.pssUserId;
          app.userInfo.ticketId = data.ticketId;
          app.userInfo.nickName = data.nickName;
          app.userInfo.avatar = data.avatar;
          app.userInfo.email = data.email;
          app.userInfo.hasBindCard = data.hasBindCard;
          app.userInfo.mobile = data.mobile;
          app.mobile = data.mobile
          //  my.reLaunch({
          //     url: "/pages/index/index", // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
          //  });
          my.switchTab({
            url: '/pages/index/index', // 跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面）。注意：路径后不能带参数
            success: (res) => {
               console.log(res,'success')
            },
          });
         
        })
      }
    })

  },
  toH5(e) {
    console.log(e)
    my.navigateTo({
      url: e.target.dataset.url
    });
  },
  sqLogin() {
      this.setData({
      modalOpened: true,
    });
    // my.getAuthCode({
    //   scopes: ['auth_user'],
    //   success: (res) => {
    //     my.alert({
    //       content: res.authCode,
    //     });
    //   },
    // });
  },
  cancel() {
    this.setData({
      modalOpened: false,
    });
  },
  accede(){
      var json1 = {
      mobile:this.data.tel,
      password:this.data.code,
      userId:app.userInfo.userId,
      loginType:'PASSWORD',
      channel:'ZFBPIAOGEN'
    }
    app.ajax(json1,"REGISTER",function(data){
      if(!!data.ticketId){
        app.userInfo.ticketId = data.ticketId;
        app.userInfo.pssUserId = data.pssUserId;
        let json2 = {
          userId:app.userInfo.userId,
          channel:'ZFBPIAOGEN'
        }
        app.ajax(json2,'LOGIN',function(data){
          app.userInfo.pssUserId = data.pssUserId;
          app.userInfo.ticketId = data.ticketId;
          app.userInfo.nickName = data.nickName;
          app.userInfo.avatar = data.avatar;
          app.userInfo.email = data.email;
          app.userInfo.hasBindCard = data.hasBindCard;
          app.userInfo.mobile = data.mobile;
          app.mobile = data.mobile
          //  my.reLaunch({
          //     url: "/pages/index/index", // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
          //  });
          my.switchTab({
            url: '/pages/index/index', // 跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面）。注意：路径后不能带参数
            success: (res) => {
               console.log(res,'success')
            },
          });
         
        })
      }
    })
 
  },
  accountLogin(e){
    this.setData({
      loginType:e.target.dataset.loginType
    })
  }
});
