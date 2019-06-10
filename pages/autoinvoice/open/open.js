const app = getApp();
Page({
  data:{
    email: "develop@dev.com",
    transEmail: false,
  },
  onLoad(){

  },
  transEmail(){
    if(this.data.transEmail)return;
    this.setData({
      transEmail: true
    })
  },
  sureOpen(){
    if(!app.buttonClick())return;
    my.confirm({
      title: '温馨提示',
      content: '自动开票功能或造成您的开票量增加，请您确认是否要开通此功能。',
      confirmButtonText: '确认开通',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          // my.alert({
          //   content: "点击确认开通"
          // }
          // app.ajax()
          my.navigateTo({
            url:"/pages/autoinvoice/openSuc/openSuc"
          });
        }
      },
    });
  },
  stop(){
    if(!app.buttonClick())return;

  }
})