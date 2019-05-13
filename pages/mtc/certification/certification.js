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
    
    console.log("0000")
  },
  cancel(){
    this.setData({
      modalOpened: false
    })
  }
})