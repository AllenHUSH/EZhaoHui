// packageAdmin/pages/pending/pending.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ["不限", "不限", "不限"],
    customItem: ['不限'],
    start_date: '2020-02-20',
    end_date: '不限',
    date: '2020-2-19',
    salaryAList: ['不限', '1-5k', '5k-10k', '10k-15k', '15k-20k', '20k+'],
    eduList: ['不限', '本科', '研究生'],
    textareaAValue: '',
    imgList: [],
    carousel: false,
    recommend: false,
    company: '',
    create_time: '',
    edu: 0,
    major: '',
    peopleNum: '',
    salary: 0,
    title: '',
  },
  //标题
  onTitle: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  //专业
  onMajor: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  //公司名称
  onCompany: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  //招聘人数
  onPeopleNum: function (e) {
    this.setData({
      peopleNum: e.detail.value
    })
  },
  //薪资
  PickerChangeA(e) {
    this.setData({
      salary: e.detail.value
    })
  },
  //学历
  PickerChangeB(e) {
    this.setData({
      edu: e.detail.value,
    })
  },
  // 改变结束时间
  DateEndChange: function (e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  //地址
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  //多行文本
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  //图片
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          });
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  //是否设为轮播
  onCarousel(e) {
    this.setData({
      carousel: e.detail.value
    })
  },
  //是否设为推荐
  onRecommend(e) {
    this.setData({
      recommend: e.detail.value
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  //长按复制url
  onLongpress: function (event) {
    var url = event.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制链接成功'
            })
          }
        })
      }
    })
  },
  //显示抽屉
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      id: e.currentTarget.dataset.id,
      username: e.currentTarget.dataset.username,
      list_index: e.currentTarget.dataset.index,
      pageUrl: e.currentTarget.dataset.url,
      region: ['吉林省', '长春市 ', '南关区'],
      major: '',
      company: '',
      end_date: '不限',
      peopleNum: '',
      salary: 0,
      edu: 0,
      textareaAValue: '',
      picture: '',
      title: '',
      imgList: [],
      carousel: false,
      recommend: false,
    })
  },
  //隐藏抽屉
  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },
  //删除
  onDelete(e) {
    let that = this;
    var username = e.currentTarget.dataset.username;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var infoList = this.data.pend_infoList;
    wx.showModal({
      title: '确定要删除吗',
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          infoList.splice(index, 1);
          that.setData({
            pend_infoList: infoList,
          });
          wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'updateUrl',
            // 传递给云函数的参数
            data: {
              id: id,
              create_time: "2020-02-20",
              end_time: "2080-02-20",
              state: 1,
              username: username,
            },
            success: res => {
              wx.showToast({
                title: '删除成功'
              });
            },
            fail: err => {
              // handle error
              console.log(err);
            }
          })
        }
      }
    });
  },  
   
  //隐藏标题提示框
  hideTModal(e) {
    this.setData({
      modalTName: null
    })
  },
  //编辑键
  onSubmit(e) {
    //标题不能为空
    if (this.data.title == '') {
      this.setData({
        modalTName: 'Modal'
      });
      // console.log(this.data.modalTName);
    } else {
      let end_time = this.data.end_date === "不限" ? "2080-02-20" : this.data.end_date;
      var infoList = {
        id: this.data.id,
        province: this.data.region[0],
        city: this.data.region[1],
        company: this.data.company,
        create_time: this.data.start_date,
        end_time: end_time,
        salary: this.data.salary,
        menbers: this.data.peopleNum,
        edu_back: this.data.eduList[this.data.edu] + ' ' + this.data.major,
        info: this.data.textareaAValue,
        picture: '',
        state: 2,
        title: this.data.title,
        url: this.data.pageUrl,
        username: this.data.username,
      };
      console.log(infoList);
      //有imgList
      if (this.data.imgList[0]) {
        var filePath = this.data.imgList[0];
        const cloudPath = "url_images/" + this.data.id + filePath.match(/\.[^.]+?$/)[0];
        //上传图像
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            // console.log('[上传文件] 成功：', cloudPath, res, res.fileID);
            // 成功则将表单推送到后台，因为图像传的比较慢，而表单里有picture，所以图像传成功之后传表单
            infoList.picture = res.fileID;
            console.log(infoList.picture);
            //console.log(infoList);
            wx.cloud.callFunction({
              // 要调用的云函数名称
              name: 'updateUrl',
              // 传递给云函数的参数
              data: infoList,
              success: res => {
                wx.showToast({
                  title: '编辑成功'
                })
              },
              fail: err => {
                // handle error
                console.log(err);
              }
            })
          }
        });
      }
      // 无imgList
      else {
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'updateUrl',
          // 传递给云函数的参数
          data: infoList,
          success: res => {
            //console.log(infoList);
            wx.showToast({
              title: '编辑成功'
            })
          },
          fail: err => {
            // handle error
            console.log(err);
          }
        })
      }
      var index = this.data.list_index;
      var pend_infoList = this.data.pend_infoList;
      pend_infoList.splice(index, 1);
      this.setData({
        pend_infoList: pend_infoList,
      });
      //设为轮播图
      if (this.data.carousel) {
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'insertRecommendIV',
          // 传递给云函数的参数
          data: {
            url_id: this.data.id
          },
          success: res => {
            console.log(res);
          },
          fail: err => {
            console.log(err);
          }
        })
      };
      //设为推荐列表
      if (this.data.recommend) {
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'insertRecommend',
          // 传递给云函数的参数
          data: {
            url_id: this.data.id,
          },
          success: res => {
            console.log(res);
          },
          fail: err => {
            // handle error
            console.log(err);
          }
        })
      };
      this.setData({
        modalName: null,
      });
    }
  },
  //加载页面
  onLoad: function (options) {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'queryUrl',
      // 传递给云函数的参数
      data: {
        type: "two",
        state: 0
      },
      success: res => {
        console.log(res.result.data);
        this.setData({
          pend_infoList: res.result.data
        })
      },
      fail: err => {
        // handle error
        console.log(err);
      },
      complete: () => {
        // ...
      }
    })
  },
})