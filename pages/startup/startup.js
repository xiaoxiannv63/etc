const app = getApp();
Page({
  data: {
    authCode: "",
    modalOpened: false,
    canIUseAuthButton: my.canIUse('button.open-type.getAuthorize')
  },
  onLoad(query) {
    var that = this;
    app.getPermision(that);
    // 页面加载
  },
  pgTelLogin() {
    my.redirectTo({
      url: "../login/bind/index"
    });
  },
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
