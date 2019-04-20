const app = getApp();
Page({
  data: {
    title: "绑定个人",
    // cards: [],
    cards: [{
         cardId: 'asdff',
        issuerName: 'asdff',
        cardType: 'asdff',
        titleName: 'asdff',
        plateNum: 'asdff'
    }]
  },
  onLoad(query) {
    console.log('onload')
    let cards = []
    for(let card of JSON.parse(query.cardIds)){
      let cardId = card.cardId
      let json1 = {
        cardId: cardId,
        ticketId: app.userInfo.ticketId
      }
      this.getCardList(json1).then( thecard=> {
        console.log(thecard)
        cards.push(thecard)
      })
    }
    this.setData({
      cards:cards
    })
  },
  getCardList(json1){
    return new Promise((resolve, reject)=>{
      app.ajax(json1,"CARD_DETAIL",(data)=>{
        let carditem = {
          cardId: data.cardId,
          issuerName: data.issuerName,
          cardType: data.cardType,
          titleName: data.titleName,
          plateNum: data.plateNum
        }
        console.log(carditem)
        resolve(carditem);
      })
    })
  },
  onShow() {
    this.setData({
      cards: this.data.cards
    })
  },
  onETC() {
    my.confirm({
      title: '温馨提示',
      content: 'ETC卡没关联抬头，不能开出发票。',
      confirmButtonText: '关联抬头',
      cancelButtonText: '查看ETC卡',
      success: (result) => {
        if(result.confirm){
          console.log("跳转到关联抬头页面")
        }
        else{
          console.log("跳转到ETC卡列表")
        }
      },
    });
  },
  onRise() {
     my.alert({
            title: '跳转到关联抬头页面' 
          });
  },
  toAddTitile(){
    my.navigateTo({
      url: "/pages/invoiceTit/index/index"
    })
  },
  toMyEtc() {
    my.navigateTo({
      url: "/pages/wodeETC/myetc/myetc"
    });
  }
});
