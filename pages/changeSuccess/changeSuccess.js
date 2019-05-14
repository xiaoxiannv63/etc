const app = getApp();
Page({
  data:{
    str: "(3)"
  },
  onLoad(){

  },
  onShow(){
    let a = 2,that = this;
    let inter = setInterval(function(){
      a --;
      that.setData({
        str: `(${a})`
      })
      if(a == 0){
        clearInterval(inter);
        that.setData({
          str: "{0}"
        });
        my.redirectTo({
          url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
          success: (res) => {
          },
        });
      }
    },1000)
  },
  goIndex(e){
    app.handleForward(e)
  }
})