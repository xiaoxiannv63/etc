const app = getApp();
Page({
  data:{
    showTip: true,
    modalOpened: false
  },
  onLoad(){

  },
  onShow(){

  },
  closableClick(){
    this.setData({
      showTip: false
    })
  },
  start(){
    this.setData({
      modalOpened: true
    })
  },
  accede(){
    this.setData({
      modalOpened: false
    })
    let var1 = {
      currentTarget:{
        dataset:{
          url:"/pages/mtc/infoConfirm/infoConfirm",
          opebType:"redirectTo"
        }
      }
    }
    app.handleForward(var1)
  },
  cancel(){
    this.setData({
      modalOpened: false
    })
    let var1 = {
      currentTarget:{
        dataset:{
          url:"/pages/mtc/infoFail/infoFail",
          opebType:"redirectTo"
        }
      }
    }
    app.handleForward(var1)
  }
})