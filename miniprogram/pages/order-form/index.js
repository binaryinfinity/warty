const { envList } = require('../../envList.js');
Page({
    data: {
        originFiles: [
            {
                url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
                name: 'uploaded1.png',
                type: 'image',
            },
            {
                url: 'https://tdesign.gtimg.com/mobile/demos/example6.png',
                name: 'uploaded2.png',
                type: 'image',
            },
            {
                url: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
                name: 'uploaded3.png',
                type: 'image',
            },
            {
                url: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
                name: 'uploaded3.png',
                type: 'image',
            },
            {
                url: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
                name: 'uploaded3.png',
                type: 'image',
            },
            {
                url: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
                name: 'uploaded3.png',
                type: 'image',
            },
        ],
        gridConfig: {
            column: 4,
            width: 160,
            height: 160,
        },
        config: {
            count: 1,
        },

        envList,
        isLoading: false,
        sales: null,
        id_input_disable: true,
        bank_input_disable: true,
        vehicle_input_disable: true,
        id: {
            disabled: false,
            name: "李斯",
            gender: "男",
            birth: "1999-07-11",
            nationality: "汉",
            digits: "440301199999999999",
            address: "深圳市南山区工业七路鑫盛花园顶楼88-88",
            authority: "XXXX分局",
            valid_date: "20231010-20431010",
            img_tmp_src: "",
            img_path: "../../images/id-front-default03.png",
            img_back_path: "../../images/id-back-default00.png"
        },
        vehicle_info: {
            addr: "地址",
            engine_num: "发动机号码",
            issue_date: "发证日期",
            model: "型号",
            official_seal: "发证机关",
            owner: "机动车所有人",
            passengers_num: "载量",
            plate_num: "车牌",
            register_date: "注册日期",
            use_character: "使用范围",
            vehicle_type: "车辆型号",
            vin: "VIN"
        },
        bankcard: {
            authority: "样例：中国银行",
            distributor: "样例：蛇口支行",
            number: "样例：8888888888888888",
        }
    },

    id_input_lock() {
        this.setData({
            'id_input_disable': !this.data.id_input_disable
        })
    },

    bank_input_lock() {
        this.setData({
            'bank_input_disable': !this.data.bank_input_disable
        })
    },

    vehicle_input_lock() {
        this.setData({
            'vehicle_input_disable': !this.data.vehicle_input_disable
        })
    },

    onLoad() {
    },

    id_success(e) {
        console.log(e)
        var ocr_id_detial = this.set_id(e.detail)
        this.setData({
            id: ocr_id_detial,
            'id.img_tmp_src': e.detail.image_path,
            'id.disabled': true
        })
        wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: "id-" + this.data.id.digits + ".jpg",
            // 指定要上传的文件的小程序临时文件路径
            filePath: this.data.id.img_tmp_src,
        }).then(res => {
            console.log('上传成功', res);
            this.setData({
                haveGetImgSrc: true,
                'id.img_path': res.fileID
            });
            wx.hideLoading();
        }).catch((e) => {
            console.log(e);
            wx.hideLoading();
        });
    },
    vehicle_success(e) {
        console.log(e)
        var ocr_vehicle_detail = this.set_vehicle(e.detail)
        this.setData({
            vehicle_info: ocr_vehicle_detail
        })
    },

    bankcard_success(e) {
        this.setData({
            'bankcard.number': e.detail.number.text,
        })
    },

    set_id(e_detail) {
        var temp_id = this.data.id
        temp_id.name = e_detail.name.text
        temp_id.gender = e_detail.gender.text
        temp_id.birth = e_detail.birth.text
        temp_id.nationality = e_detail.nationality.text
        temp_id.digits = e_detail.id.text
        temp_id.address = e_detail.address.text
        temp_id.img_src = e_detail.image_path
        return temp_id
    },

    set_vehicle(e_detail) {
        var temp_vehicle = this.data.vehicle_info
        temp_vehicle.addr = e_detail.addr.text
        temp_vehicle.engine_num = e_detail.engine_num.text
        temp_vehicle.issue_date = e_detail.issue_date.text
        temp_vehicle.model = e_detail.model.text
        temp_vehicle.official_seal = e_detail.official_seal.text
        temp_vehicle.owner = e_detail.owner.text
        temp_vehicle.plate_num = e_detail.plate_num.text
        temp_vehicle.register_date = e_detail.register_date.text
        temp_vehicle.use_character = e_detail.use_character.text
        temp_vehicle.vehicle_type = e_detail.vehicle_type.text
        temp_vehicle.vin = e_detail.vin.text
        return temp_vehicle
    },

    async fetchSalesList() {
        this.setData({ isLoading: true });
        const res = await wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: { type: 'selectRecord' },
        });
        console.log(res);
        const sales = res?.result?.data || [];
        console.log(sales);
        this.setData({
            isLoading: false,
            sales
        });
        for (var key in this.data.sales) {
            var obj = this.data.sales[key];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    console.log(prop + " = " + obj[prop]);
                }
            }
        }
    },

    updateRecord() {
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'createCollectionId',
                id: this.data.id
            }
        }).then((resp) => {
            console.log(resp);
        }).catch((e) => {
            console.log(e);
        });
    },


    addRecord() {
        const db = wx.cloud.database()
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

    methods: {
        handleSuccess(e) {
            const { files } = e.detail;
            this.setData({
                originFiles: files,
            });
        },
        handleRemove(e) {
            const { index } = e.detail;
            const { originFiles } = this.data;
            originFiles.splice(index, 1);
            this.setData({
                originFiles,
            });
        },
        handleClick(e) {
            console.log(e.detail.file);
        },
    },
})