Page({
    data: {
        question: "question",
        answer: "answer"
    },

    onLoad() {
        wx.cloud.downloadFile({
            fileID: 'cloud://warty-cloud-4gtm7ock18098264.7761-warty-cloud-4gtm7ock18098264-1326666902/README.md',
            success: res => {
                console.log(res)
                console.log(res.tempFilePath)
            },
            fail: err => {
                console.log(err)
            }
        })
    }
})

// const fs = wx.getFileSystemManager()
// fs.readFile({
//   filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
//   encoding: 'utf8',
//   position: 0,
//   success(res) {
//     console.log(res.data)
//   },
//   fail(res) {
//     console.error(res)
//   }
// })