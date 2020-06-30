const baseUrl = 'https://areal.weboostapp.com/api/api/v1/'

export function request(url, param) {
  const { hideLoading } = param
  return new Promise((resolve, reject) => {
    if (!hideLoading) {
      mpvue.showLoading();
    }
    try {
      wx.request({
        url: baseUrl + url,
        method: param ? param.method || 'POST' : 'POST',
        ...param,
        success(res) {
          const code = getIn(res, 'data', 'code')
          mpvue.hideLoading();
          if (code === 0) {
            if (param && param.successMsg) {
              mpvue.showToast({
                title: param.successMsg,
                icon: "none"
              });
            }
            resolve(res.data.data || res.data)
          } else {
            if (param && param.errorMsg) {
              mpvue.showToast({
                title: param.errorMsg,
                icon: "none"
              });
            }
            resolve('')
          }
        },
        fail(err) {
          mpvue.hideLoading();
          console.log('request fail:')
          mpvue.showToast({
            title: "服务器错误",
            icon: "none"
          });
          resolve('')
        },
      })
    } catch (err) {
      console.log('catched errro')
      console.log(err)
      mpvue.hideLoading();
      mpvue.showToast({
        title: "服务器错误",
        icon: "none"
      });
      resolve('')
    }
  })
}

export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDate(input) {
  if (typeof(input) == 'string' && input.indexOf('-') > -1) {
    input = input.replace(new RegExp('-', 'g'), '/');
  }
  const date = new Date(input)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${String(month).padStart(2, "0")}月${String(day).padStart(2, "0")}日`
}

export function getIn(obj, ...restParams) {
  if (typeof (obj) === 'undefined') {
    return null
  }
  const validateObj = (object, key) => {
    return ['undefined'].indexOf(typeof (object[key])) === -1 ? object[key] : null
  }
  const paramLen = restParams.length
  let currentIndex = 0,
    currentVal = validateObj(obj, restParams[currentIndex])
  if (!restParams.length) {
    return obj
  }

  while (currentVal !== null) {
    // 如果已经是最后一层结构，直接返回
    if (currentIndex === paramLen - 1) {
      return currentVal
    }
    // 如果不是最后一层且值存在，进行深层判断
    if (currentVal !== null) {
      currentIndex++
      currentVal = validateObj(currentVal, restParams[currentIndex])
    } else {
      return null
    }
  }
}

export const downloadFile = (url, type) => {
  mpvue.getSetting({
    success: res => {
      console.log(res)
      if (res.authSetting['scope.writePhotosAlbum']) {
        console.log('已授权')
      } else if (res.authSetting['scope.writePhotosAlbum'] === false) {
        console.log('未授权')
        mpvue.openSetting()
      }
    }
  })
  mpvue.showLoading({
    title: '保存中'
  })
  mpvue.downloadFile({
    url,
    success: res => {
      console.log(res)
      if (type == 'video') {
        mpvue.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            mpvue.showToast({
              title: '保存文件成功'
            })
          },
          fail: () => {
            mpvue.showToast({
              title: '保存文件失败',
              icon: 'none'
            })
          }
        })
      } else if (type == 'image') {
        mpvue.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            mpvue.showToast({
              title: '保存文件成功'
            })
          },
          fail: (err) => {
            console.log(err)
            mpvue.showToast({
              title: '保存文件失败',
              icon: 'none'
            })
          }
        })
      } else {
        mpvue.openDocument({
          filePath: res.tempFilePath,
          success: () => {
            mpvue.showToast({
              title: '下载文件成功'
            })
          },
          fail: () => {
            mpvue.showToast({
              title: '下载文件失败',
              icon: 'none'
            })
          }
        })
      }
    },
    fail: () => {
      mpvue.showToast({
        title: '下载文件失败',
        icon: 'none'
      })
    }
  })
}