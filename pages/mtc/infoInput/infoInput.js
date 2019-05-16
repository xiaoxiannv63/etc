const app = getApp();
Page({
  data:{
    name: "",
    idCode: ""
  },
  onLoad(){

  },
  onShow(){

  },
  setName(e){
    this.setData({
      name: e.detail.value.replace(/\s+/g,"")
    })
  },
  setIdCode(e){
    this.setData({
      idCode: e.detail.value.replace(/\s+/g,"")
    })
  },
  sureInfo() {
    if(!app.buttonClick()) return;
    if(this.data.name !== "" && /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.data.idCode)){
      my.alert({
        content: "已点击确认信息",
        success:()=>{
          let json1 = {
            ticketId:app.userInfo.ticketId,
            idcard_number: this.data.idCode,
            idcard_name: this.data.idcard_name
          }
          app.ajax(json1,"MTC_CERTIFICATIONBUSINESS",(data)=>{
            my.navigateTo({
              url: "/pages/mtc/infoSuc/infoSuc"
            });
          })
        }
      })
    }else{
      my.alert({
        content: "您输入的身份信息有误"
      })
    }
  }
})