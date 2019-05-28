const app = getApp();
Page({
  data: {
    detail:{},
    carType:{
      "CAR_1":"一型客车",
      "CAR_2":"二型客车",
      "CAR_3":"三型客车",
      "CAR_4":"四型客车",
      "WEIGHT_CAR_1":"一型货车",
      "WEIGHT_CAR_2":"二型货车",
      "WEIGHT_CAR_3":"三型货车",
      "WEIGHT_CAR_4":"四型货车",
      "WEIGHT_CAR_5":"五型货车",
      "UNDETERMINED":"未确定"
    }
  },
  onLoad(query){
    console.log(query)
    let detail = JSON.parse(query.detail)
    let reinvoice = false;
    if(query.reinvoice){reinvoice=true}
    this.setData({
      detail,
      reinvoice
    })
    console.log(this.data.detail)
  },
  onShow(){
    if(app.licensePlateFlag){
      app.licensePlateFlag = false
      console.log(app.licensePlate)
      this.data.detail.newPlateNum = app.licensePlate.plateNum
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
    }else{
      this.data.detail.newPlateNum = this.data.detail.plateNum
    }
  },
  //修改车牌号
  goKeyWordpage(){
    let var1 = {
        currentTarget: {
          dataset: {
            url: '../addLicensePlate/addLicensePlate',
            openType: "navigateTo"
          }
        }
      }
    app.handleForward(var1)
  },
  //信息无误
  goInvoice(){
    if(!app.buttonClick())return;
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
  },
  // 确认重新开票
  sureReinvoice(){
    if(!app.buttonClick())return;
    my.confirm({
        title: '温馨提示',
        content: `您本次开票的车牌号已修改为[${this.data.detail.newPlateNum}],请认真核对`,
        align: 'left',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (result) => {
          if(result.confirm){
            let json1 = {
              ticketId: app.userInfo.ticketId,
              applyId: this.data.detail.applyId,
              plateNum: this.data.detail.newPlateNum
            }
            app.ajax(json1,"MTC_REPEATAPPLY",(data)=>{
              my.navigateTo({
                url:"/pages/mtc/invoiceSuccess/invoiceSuccess"
              })
            })
          }
        }
    })
 
  }
})