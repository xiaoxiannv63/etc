const app = getApp();
Page({
  data: {
    hasPower: false,
  },
  onLoad(){
    this.getPermision();
  },
  onShow() {
    if(!this.hasPower){
      this.getPermision();
    }
  },
  getUserInfo(){
    my.getAuthUserInfo({
      success: (user) => {
        this.setData({
          user,
          mobile: app.userInfo.mobile
        })
        //console.log("user",user, user.nickName, user.avatar )
      }
    });
  },
  getPermision(){
    let that = this;
    my.getAuthCode({
      scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {
        // console.log(res.authCode);
        that.setData({
          hasPower: true
        })
        that.getUserInfo();
        
        if(!app.authCode){
          that.indRes();
        }
        // app.authCode = res.authCode;
      }
    });
  },
  indRes(){
    let json1 = {
      code: app.authCode,
      channel: 'ZFBPIAOGEN'
    }
    app.ajax(json1,"ONLINE",function(data){
        app.userInfo = data;
        if(!data.ticketId){
          my.navigateTo({
            url:"/pages/startup/startup",
          });
        }else{
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
          })
        }
    },function(e){
      console.log(e)
    })
  },
  toView(e){
    if(app.authCode){
      let url = e.target.dataset.url;
      my.navigateTo({
        url: url
      });
    }else{
      this.getPermision();
    }
  },
  unregister(){
    console.log(123);
    let json1 = {
      pssUserId:app.userInfo.pssUserId,
      channel: 'ZFBPIAOGEN',
      ticketId: app.userInfo.ticketId,
      userId: app.userInfo.userId
    }
    app.ajax(json1,"UNREGISTER",function(data){
        if(data.success){
          my.redirectTo({
            url:"/pages/startup/startup", // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
            success: (res) => {
              
            },
          });
          my.navigateTo({
             url:"/pages/startup/startup",
          });
        }
    },function(e){
      console.log(e)
    })
  }
});
