
const app = getApp();
Page({
  data: {
    applyId:''
  },
  onLoad(query) {
    console.log('---换??退??---',query)
    this.setData({
      applyId: query.applyId,
      cardId: query.cardId
    })
  },
  changeEvent(e) {
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/changing/changing?applyId=${this.data.applyId}&cardId=${this.data.cardId}`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
});
