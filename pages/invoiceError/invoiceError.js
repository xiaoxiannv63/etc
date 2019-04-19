
const app = getApp();
Page({
  data: {
    // status: {
    //   tp: "红冲",
    //   hp: "变更"
    // }
  },
  onLoad(e) {
  },
  changeEvent(e) {
    my.navigateTo({
      url: `../changing/changing?statusId=${e.target.dataset.status}`
    })
    // my.confirm({
    //   title: '温馨提示',
    //   content: `您正在申请发票${this.data.status[e.target.dataset.status]}，请您认真核对需要${this.data.status[e.target.dataset.status]}的发票，申请提交后，系统将三个工作日内处理您的申请，原有发票将无法继续使用，该发票申请对应的交易记录恢复为待开票状态。`,
    //   align:'left',
    //   confirmButtonText: '知道了',
    //   cancelButtonText: '取消',
    //   success: (result) => {
    //     if(result.confirm){

    //     }
    //   },
    // });
  }
});
