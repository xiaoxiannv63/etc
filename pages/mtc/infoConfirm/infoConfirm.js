const app = getApp();
Page({
  data:{
    hasInfo: true, // 已经进行过实名认证，确认信息页。
  },
  onLoad(){

  },
  onShow(){

  },
  commit(){
    let var1 = {
      currentTarget:{
        dataset:{
          url: "/pages/mtc/infoSuc/infoSuc",
          iopenType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  },
  confirmInfo(){
    let var1 = {
      currentTarget:{
        dataset:{
          url: "/pages/mtc/infoSuc/infoSuc",
          iopenType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
})