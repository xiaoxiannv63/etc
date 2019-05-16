const app = getApp();
Page({
  data: {
    detail:{}
  },
  onLoad(query){
    console.log(query)
    let detail = JSON.parse(query.detail)
    this.setData({
      detail
    })
    console.log(this.data.detail)
  },
  onShow(){
    if(app.licensePlateFlag){
      console.log(app.licensePlate)
      this.data.detail.plateNum = app.licensePlate.plateNum
      switch (app.licensePlate.color) {
        case 0:
          this.data.detail.plateColor = "BLUE"
          break;
        case 1:
          this.data.detail.plateColor = "YELLOW"
          break;
        case 2:
          this.data.detail.plateColor = "GREEN"
           break;
        default:
          this.data.detail.plateColor = "BLUE"
      }
      this.setData({
        detail:this.data.detail
      })
    }
  },
  //修改车牌号
  goKeyWordpage(){
    my.navigateTo({
      url: "../addLicensePlate/addLicensePlate"
    })
  },
  //信息无误
  goInvoice(){
    let detail = JSON.stringify(this.data.detail)
    my.setStorageSync({
      key: 'detail',
      data: detail
    });
    let var1 = {
      currentTarget: {
        dataset: {
          url: `/pages/mtc/confirmSuccess/confirmSuccess`,
          openType: "navigateTo"
        }
      }
    }
    app.handleForward(var1)
  }
})