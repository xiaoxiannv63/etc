const app = getApp();
Page({
  data:{
    hasInfo: true, // 已经进行过实名认证，确认信息页。
  },
  onLoad(){

  },
  onShow(){

  },
  setName(e){
    console.log(e)
    this.setData({
      name: e.detail.value.replace(/\s+/g,"")
    })
  },
  setIdCode(e){
    this.setData({
      idCode: e.detail.value.replace(/\s+/g,"")
    })
  },
  // sureInfo() {
  //   if(!app.buttonClick()) return;
  //   if(this.data.name !== "" && /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.data.idCode)){
  //     my.alert({
  //       content: "已点击确认信息"
  //     })
  //   }else{
  //     my.alert({
  //       content: "您输入的身份信息有误"
  //     })
  //   }
  // },
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