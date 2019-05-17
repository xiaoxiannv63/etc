const app = getApp();
Page({
  data: {},
  onLoad() {},
  continue(){
    let var1 = {
        currentTarget: {
          dataset: {
            url: `/pages/mtc/recordList/recordList?tab=${1}`,
            openType: "reLaunch"
          }
        }
      }
    app.handleForward(var1)
  }
});
