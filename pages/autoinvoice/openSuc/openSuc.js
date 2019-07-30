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
    let cardsAmount = my.getStorageSync({
      key: 'cardsAmount', // 缓存数据的key
    }).data;
    let showBackEnvoice = my.getStorageSync({key: 'showBackEnvoice'}).data;
    this.setData({
      cardId: query.cardId,
      titleId: query.titleId,
      titleName: query.titleName,
      type: query.type,
      plateNum: query.plateNum,
      cardsAmount: cardsAmount,
      showBackEnvoice: showBackEnvoice,
    })
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
  },
  goInvoices(e){
    app.handleForward(e)
  },
 goRoutes(){
    let str = "?cardId=" + this.data.cardId+"&titleId="+this.data.titleId+"&titleName="+this.data.titleName+"&type="+this.data.type+"&plateNum="+this.data.plateNum;

    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/iWangTo/recordList/recordList${str}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1) 
  },
  continue(e){
    app.handleForward(e)
  },
  goIndex(e){
    app.handleForward(e)
  }
})