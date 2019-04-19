
const app = getApp();
Page({
  data: {
    status: {
      tp: { name: "红冲", title: "退票/红冲" },
      hp: { name: "变更", title: "发票变更" }
    },
    applyId: "",
    list:[
      {
        name:"行云数聚（北京）科技有限公司",
        type:"company",
        checkValue:"01",
        checked: false,
        dutyParagraph:"911110102005MA00FHBOOD"
      },
      { 
        name:"张三",
        checkValue:"02",
        checked: false,
        type:"persona"
      }
    ]
  },
  onLoad(e) {    
    console.log(e.statusId)
    this.setData({
      applyId: e.statusId
    })
    my.setNavigationBar({
      title: "申请"+this.data.status[this.data.applyId].title,
    });
  },
  changeTicket(e) {
    my.confirm({
      title: '温馨提示',
      content: `您正在申请发票${this.data.status[this.data.applyId].name}，请您认真核对需要${this.data.status[this.data.applyId].name}的发票，申请提交后，系统将三个工作日内处理您的申请，原有发票将无法继续使用，该发票申请对应的交易记录恢复为待开票状态。`,
      align: 'left',
      confirmButtonText: '知道了',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          console.log("确定了。。。")
        }
      },
    });
  },
  addHead(e){
     let type= e.target.dataset.type
     if(type=="new"){
       console.log("new")
     }
     else if(type=="look"){
       console.log("look")
     }     
  },
  radioChange(e){
    
    console.log(e)
  }
});
