const app = getApp();
Page({
  data: {
    title: "绑定个人"
  },
  onLoad(query) {
    
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
  }
});
