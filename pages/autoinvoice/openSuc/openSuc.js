const app = getApp();
Page({
  data:{
    contents:[
      "已经向您的邮箱发送一封邮件",
      "您现在已有的通行记录将不会自动开票",
    ],
    cardId: '',
    plateNum: ''
  },
  onLoad(query){
    this.setData({
      cardId: query.cardId,
      plateNum: query.plateNum
    })
  },
  goInvoices(){
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/myInvoice/serInvList/serInvList?cardId=${this.data.cardId}&plateNum=${this.data.plateNum}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1) 
  },
  goUserInfo(){
    let var1 = {
      currentTarget: {
        dataset: {
          url: '/pages/user/user',
          openType: "switchTab"
        }
      }
    }
    app.handleForward(var1)  
  }
})