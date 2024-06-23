// pages/login-page/index.js
const app = getApp()
const db = wx.cloud.database()

Page({

    data: {
        userInfo: null,
        avatarUrl: '/images/icons/avatar.png',
        myMessage: '登陆后尽享受更多权益',
        phoneNumber: ''
    },

    login() {
        wx.switchTab({
          url: '../home-page/index',
        })
        //     wx.showLoading({
        //         title: 'Logining...',
        //     })
        //     wx.getUserProfile({
        //         desc: '获取用户信息',
        //         success: res => {
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //                 avatarUrl: res.userInfo.avatarUrl,
        //                 myMessage: res.userInfo.nickName
        //             })
        //             wx.hideLoading()
        //             console.log(app.globalData.userInfo)
        //             console.log(this.data.userInfo)
        //         }
        //     })
    },

    addRecord() {
        db.collection('todos').add({
            // data 字段表示需新增的 JSON 数据
            data: {
                // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                description: "learn cloud database",
                due: new Date("2018-09-01"),
                tags: [
                    "cloud",
                    "database"
                ],
                // 为待办事项添加一个地理位置（113°E，23°N）
                location: new db.Geo.Point(113, 23),
                done: false
            },
            success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
            }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        getApp().onLoad()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})