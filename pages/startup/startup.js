const app = getApp();
Page({
  data: {
    authCode: "",
    modalOpened: false,
    canIUseAuthButton: my.canIUse('button.open-type.getAuthorize')
  },
  onLoad(query) {
    // if(!query.unregister){
    //   var that = this;
    //   app.getPermision(that);
    // }
    // 页面加载
  },
  pgTelLogin() {
    app.getUserInfo()
    // app.getUserInfo().then((res)=>{
    //   console.log(1111111111)
    //   // app.userInfo = res

    // }).catch((e)=>{
  
    // })
  },
    // my.redirectTo({
    //   url: "../login/bind/index"
    // });
  // },
  cancel() {
    this.setData({
      modalOpened: false,
    });
  },
  sqLogin() {
    this.setData({
      modalOpened: true,
    });
  },
  accede(){
     let that = this
     app.phoneNumber(that)
  },

  gotoQuestion() {
    my.navigateTo({
      url: "/pages/question/question"
    });
  },
});