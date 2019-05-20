var app = getApp();
Page({
  data: {
    
  },
  onLoad(query) {
    if(!query.unregister){
      var that = this;
      app.getPermision(that);
    }
  },
  ajax(json1,type,succ,fail,compl){
    console.log("app.ajax=-=-=")
    //判断是否有ticketid，且接口类型是否需要ticketid
    let noNeedLoginTypeArr = {
      'ONLINE': 1,
      'REGISTER': 1,
      'LOGIN': 1,
      'BACKPASSWORD': 1,
      'VALIDCODE': 1
    };
    if(!app.userInfo.ticketId && !noNeedLoginTypeArr[type] ){
      console.log("-0-0-0-0-0-")
      my.hideLoading();
      my.redirectTo({
        url:"/pages/login/bind/index",
      })
      return;
    }
    let data = {
      jsonStr: JSON.stringify(json1),
      type: type
    }
    let urlData = "";
    for(let o in data){
      urlData += o + "=" +data[o]+"&"
    };
    console.log('---请求参数----',data);
    let md5Text = app.md5Code(urlData.substring(0,urlData.length-1));
    my.httpRequest({
      url: app.ajaxRoot,
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Request-Headers':md5Text},
      method: 'POST',
      data: data,
      dataType: 'json',
      success: function(res) {
        let data = JSON.parse(res.data.jsonStr);
        console.log('---响应参数---',data);
        if(data.success){
          succ(data)
        }else{
          if(data.code == '702'){
            console.log(702)
            my.redirectTo({
              url:"/pages/login/bind/index",
            })
          }else if(fail && data.msg){
            fail(data);
          }else{
      
          }
        }
      },
      fail: function(res) {
        console.log(res);
        !!fail&&fail(res.data);
      },
      complete: function(res) {
        compl&&compl();
      }
    });
  },
  getPermision() {
    my.getAuthCode({
      scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {
        app.authCode = res.authCode;
        this.indRes()
      }
    });
  },
  indRes() {
    let json1 = {
      code: app.authCode,
      channel: 'ZFBPIAOGEN'
    }
    this.ajax(json1, "ONLINE",  (data)=> {
      console.log(data.userId, 'ONLINE (userId)')
      app.userInfo.userId = data.userId;
      console.log(app.userInfo, 'this.userInfo')
      if (!data.ticketId) { //没有ticketId 不做跳转
          my.redirectTo({
            url: "/pages/startup/startup?unregister=true"
          });
      } else {
        console.log("ticket 有效  ")
        let json2 = {
          userId: app.userInfo.userId,
          channel: 'ZFBPIAOGEN'
        }
        console.log(this,'this')
        this.ajax(json2, 'LOGIN',  (data)=> {
          console.log(data, "支付宝启用。。")
          app.userInfo.pssUserId = data.pssUserId;
          app.userInfo.ticketId = data.ticketId;
          app.userInfo.mobile = data.mobile;
          app.userInfo.email = data.email;
          app.userInfo.hasBindCard = data.hasBindCard;
          console.log(app.userInfo)
          // app.mobile = data.mobile
          // my.navigateBack();
          // my.reLaunch({
          my.switchTab({
            url: "/pages/index/index"
          });
        })
      }
    }, function (e) {
      console.log(e, 'ONLINE获取失败。。。。')
    })
  },
})