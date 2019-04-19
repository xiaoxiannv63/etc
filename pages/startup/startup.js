const app = getApp();
Page({
  data: {
    authCode: "",
    modalOpened: false,
  },
  onLoad(query) {
    this.getPermision()

    // 页面加载
  },
  getPermision() {
    let that = this;
    my.getAuthCode({
      scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {
        console.log(res, '授权成功authCode。。。。。')
        app.authCode = res.authCode;
        this.data.authCode = res.authCode;
        app.getUserInfo().then(res => {
          console.log(res, 'getUserInfo')

          app.userInfo.nickName = res.nickName
          app.userInfo.avatar = res.avatar
          // app.mobile = res.mobile
          // this.setData({
          //   userInfo: res,
          //   mobile: app.userInfo.mobile
          // })
          console.log(this.data.userInfo)
        });
        that.indRes();

      }
    });
  },

  indRes() {
    let json1 = {
      code: app.authCode,
      channel: 'ZFBPIAOGEN'
    }
    app.ajax(json1, "ONLINE", function (data) {
      console.log(data, 'onlinexxxx')
      app.userInfo.userId = data.userId;
      if (!data.ticketId) { //没有ticketId 不做跳转
      } else {
        let json2 = {
          userId: app.userInfo.userId,
          channel: 'ZFBPIAOGEN'
        }
        app.ajax(json2, 'LOGIN', function (data) {
          console.log(data, "支付宝启用。。")
          app.userInfo.pssUserId = data.pssUserId;
          app.userInfo.ticketId = data.ticketId;
          app.userInfo.mobile = data.mobile;
          app.userInfo.email = data.email;
          app.userInfo.hasBindCard = data.hasBindCard;
          // app.mobile = data.mobile
          // my.navigateBack();
          // my.reLaunch({
          my.switchTab({
            url: "/pages/index/index"
          });
        })
      }
    }, function (e) {
      console.log(e, '获取失败。。。。')
    })
    // let urlData = "";
    // for(let o in data){
    //   urlData += o + "=" +data[o]+"&"
    // }
    // // urlData=urlData.substring(0,urlData.Length-1)
    // // console.log(app.md5Code(JSON.stringify(data))) 
    // let md5Text = app.md5Code(urlData);
    // my.httpRequest({
    //   url: app.ajaxRoot,
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Request-Headers':md5Text},
    //   method: 'POST',
    //   data: data,
    //   dataType: 'json',
    //   success: function(res) {
    //     my.alert({content: 'success'});
    //   },
    //   fail: function(res) {
    //     my.alert({content: 'fail'});
    //   },
    //   complete: function(res) {
    //     my.hideLoading();
    //     my.alert({content: 'complete'});
    //   }
    // });
  },
  pgTelLogin() {
    my.redirectTo({
      url: "../login/bind/index"
    });
  },
  zfbLogin(e) {
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
  onGetAuthorize() {
    my.getPhoneNumber({
      success: (res) => {
        // console.log(res.response,'neir..')
        let arr = JSON.parse(res.response)
        // console.log(arr.response, 'JSON.PARSE')
        var json1 = {
          code: app.authCode,
          encryptedData: arr.response,
          userId: app.userInfo.userId,
          loginType: 'ALIPAY',
          channel: 'ZFBPIAOGEN'
        }
        app.ajax(json1, "REGISTER", function (data) {
          console.log("进入。。。", data)
          if (!!data.ticketId) {
            app.userInfo.ticketId = data.ticketId;
            app.userInfo.pssUserId = data.pssUserId;
            let json2 = {
              userId: app.userInfo.userId,
              channel: 'ZFBPIAOGEN'
            }
            app.ajax(json2, 'LOGIN', function (data) {
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
              });
              my.navigateBack();
            })
          }
        })

        // console.log(res,'aaa')      
      },
      fail: (res) => {
        console.log(res, 'getPhoneNumber_fail')
      },
    })
  },

  gotoQuestion() {
    my.navigateTo({
      url: "/pages/question/question"
    });
  }
});
