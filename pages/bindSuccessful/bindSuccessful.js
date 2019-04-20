const app = getApp();
Page({
  data: {
    title: "绑定个人",
    cards: []
  },
  onLoad(query) {
    console.log('onload')
    this.data.cards = []
    for(let card of JSON.parse(query.cardIds)){
      let cardId = card.cardId
      let json1 = {
        cardId: cardId,
        ticketId: app.userInfo.ticketId
      }
      this.getCardList(json1)
    }
  },
  getCardList(json1){
    app.ajax(json1,"CARD_DETAIL",(data)=>{
      let item = {
        cardId: data.cardId,
        issuerName: data.issuerName,
        cardType: data.cardType,
        titleName: data.titleName,
        plateNum: data.plateNum
      }
    })
    this.data.cards.push(item)
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
      url: "/pages/invoiceTit/index"
    })
  },
  toMyEtc() {
    my.navigateTo({
      url: "/pages/wodeETC/myetc/myetc"
    });
  }
});
