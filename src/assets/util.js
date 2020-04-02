/* eslint-disable */
import Vue from 'vue'

//localStorage
export const storage = function(key, value) {
    if (value === void(0)) {
        let lsVal = localStorage.getItem(key);
        if (lsVal && lsVal.indexOf('autostringify-') === 0) {
            return JSON.parse(lsVal.split('autostringify-')[1]);
        } else {
            return lsVal;
        }
    } else {
        if (typeof(value) === "object" || Array.isArray(value)) {
            value = 'autostringify-' + JSON.stringify(value);
        };
        return localStorage.setItem(key, value);
    }
}
//生成随机数
export const getUUID = function(len) {
    len = len || 6;
    len = parseInt(len, 10);
    len = isNaN(len) ? 6 : len;
    var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
    var seedLen = seed.length - 1;
    var uuid = "";
    while (len--) {
        uuid += seed[Math.round(Math.random() * seedLen)];
    }
    return uuid;
};
//深拷贝
export const deepcopy = function(source) {
    if (!source) {
        return source;
    }
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
    }
    return sourceCopy;
};

//日期格式化
export const dateFormat = function(source, ignore_minute) {
    const separate = '-';
    if (!source) {
        source = new Date();
    }

    if (!isNaN(parseInt(source))) {
        //时间戳（秒）
        source = source * 1000
    } else if (source.split) {
        //字符串过滤'-'
        source = source.replace(/\-/g, '/');
    }

    if (new Date(source) && (new Date(source)).getDate) {
        let myDate = new Date(source);
        let minute = '';
        if (!ignore_minute) {
            minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
        }
        return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
    } else {
        return source.slice(0, 16);
    }

};

// 数字格式化
export const NumberFormat = function(value) {
    var result = parseFloat(value).toFixed(1)
    return result
}
// 返回文件图标
const IconHash = {
    'doc': require('@/assets/img/file_word.jpg'),
    'docx': require('@/assets/img/file_word.jpg'),
    'xls': require('@/assets/img/file_xls.jpg'),
    'xlsx': require('@/assets/img/file_xls.jpg'),
    'ppt': require('@/assets/img/file_ppt.jpg'),
    'pptx': require('@/assets/img/file_ppt.jpg'),
    'pdf': require('@/assets/img/file_pdf.jpg'),
}
export const fileIcon = function(url) {
    if (url && url.split) {
        let ext = url.match(/\.([^\.]+)$/)
        if (ext.length) {
            ext = ext[1].toLowerCase();
            return IconHash[ext]
        }
    }
}
//菜单数据组织
export const buildMenu = function(array, ckey) {
    let menuData = [];
    let indexKeys = Array.isArray(array) ? array.map((e) => {
        return e.id
    }) : [];
    ckey = ckey || 'pId';
    array.forEach(function(e) {
        //一级菜单
        if (!e[ckey] || (e[ckey] === e.id)) {
            delete e[ckey];
            menuData.push(deepcopy(e)); //深拷贝
        } else if (Array.isArray(indexKeys)) {
            //检测ckey有效性
            let parentIndex = indexKeys.findIndex(function(id) {
                return id == e[ckey];
            });
            if (parentIndex === -1) {
                menuData.push(e);
            }
        }
    });
    let findChildren = function(parentArr) {
        if (Array.isArray(parentArr) && parentArr.length) {
            parentArr.forEach(function(parentNode) {
                array.forEach(function(node) {
                    if (parentNode.id === node[ckey]) {
                        if (parentNode.children) {
                            parentNode.children.push(node);
                        } else {
                            parentNode.children = [node];
                        }
                    }
                });
                if (parentNode.children) {
                    findChildren(parentNode.children);
                }
            });
        }
    };
    findChildren(menuData);
    return menuData;
}
//根据value查label
export const labelTextByValue = function(val, array) {
    if (val && array.length) {
        let start = array.findIndex(e => {
            return e.value === val
        })
        if (start > -1) {
            return array[start].label
        } else {
            return ''
        }
    }
}
//encode
const encodelist = ['name', 'process_name', 'process_step_name', 'creator']

export const paramEncode = function(obj) {
    if (obj && obj.split) {
        try {
            return encodeURIComponent(obj)
        } catch (e) {
            return obj
        }
    } else {
        let result = deepcopy(obj)
        if (result) {
            encodelist.forEach(e => {
                if (result[e]) {
                    result[e] = encodeURIComponent(result[e])
                }
            })
        }
        return result
    }

}

export const paramDecode = function(obj) {
    if (obj && obj.split) {
        try {
            return decodeURIComponent(obj)
        } catch (e) {
            return obj
        }
    } else {
        let result = deepcopy(obj)
        if (result) {
            encodelist.forEach(e => {
                if (result[e]) {
                    result[e] = decodeURIComponent(result[e])
                }
            })
        }
        return result
    }

}

//图片压缩
export const compress = function(file, callback) {
    // 压缩图片需要的一些元素和对象
    let reader = new FileReader(),
        img = new Image();

    // 缩放图片需要的canvas
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    // base64地址图片加载完毕后
    img.onload = function() {
        // 图片原始尺寸
        let originWidth = this.width;
        let originHeight = this.height;
        // 最大尺寸限制
        let maxWidth = 1200,
            maxHeight = 1200;
        // 目标尺寸
        let targetWidth = originWidth,
            targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }

        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        // canvas转为blob并上传
        let base64 = canvas.toDataURL();
        typeof callback === 'function' && callback(base64)
    };

    // 文件base64化，以便获知图片原始尺寸
    reader.onload = function(e) {
        img.src = e.target.result;
    };
    if (file.type.indexOf("image") == 0) {
        reader.readAsDataURL(file);
    }
}

let bus = new Vue();
//监听事件
export const on = function(eventName, eventHandle) {
    if (eventName && (typeof eventHandle === 'function'))
        return bus.$on(eventName, eventHandle)
};
//触发事件
export const emit = function(eventName, msg) {
    return bus.$emit(eventName, msg)
};

//日常事务上传格式
export const uploadFile = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "text/plain",
    "application/x-zip-compressed",
    "application/x-rar-compressed",
    ".rar",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/pdf"
]

//ajax错误处理
export const catchError = function(error) {
    if (error.data) {
        error.response = error.data
    }
    //去掉重复message弹窗
    if (window.message) {
        return
    }
    window.message = true;

    if (error.response) {
        switch (error.response.status) {
            case 400:
                Vue.prototype.$message({
                    message: error.response.statusCode || '请求参数异常',
                    type: 'error',
                    onClose: function() {
                        window.message = false
                    }
                });
                break;
            case 401:
                storage('user', '');
                Vue.prototype.$message({
                    message: error.response.statusCode || '密码错误或账号不存在！',
                    type: 'warning',
                    duration: 1000,
                    onClose: function() {
                        window.message = false
                        //location.reload();
                        emit('logout')
                    }
                });
                break;
            case 403:
                Vue.prototype.$message({
                    message: error.response.statusCode || '无访问权限，请联系企业管理员',
                    type: 'warning',
                    onClose: function() {
                        window.message = false
                    }
                });
                break;
            default:
                Vue.prototype.$message({
                    message: error.response.statusCode || '服务端异常，请联系技术支持',
                    type: 'error',
                    onClose: function() {
                        window.message = false
                    }
                });
        }
    } else if (error.message) {
        let message = error.message;
        try {
            message = JSON.parse(message)
        } catch (e) {
            if (message.indexOf('timeout') > -1) {
                message = '请求超时，请重试'
            }
            if (message.indexOf('Network') > -1) {
                message = '网络异常'
            }
        }
        Vue.prototype.$message({
            message: message.statusCode || message,
            type: 'error',
            onClose: function() {
                window.message = false
            }
        });

    }
    return Promise.reject(error);
}

// 获取扩展名
export const get_suffix = (filename) => {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos + 1)
    }
    return suffix;
}
//数字转汉字
export const numToZh = (num) => {
    if (num.split) {
        num = parseInt(num)
    }
    return ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][num]
}
// weboffice 预览
export const weboffice = function(item, needtip) {
    console.log(item)
    const previewLimit = 1024 * 1024 * 5;
    if (item.weboffice_url && item.source_size) {
        if (parseInt(item.source_size) < previewLimit) {
            return window.open(item.weboffice_url)
        } else if (needtip) {
            return this.$message({
                message: '文件过大 请下载后查看',
                type: 'warning'
            });
        }
    }
    item.url && window.open(item.url)
}
//通过id寻找父级链
export const getFullArray = function(val, array) {
    if (val && Array.isArray(array) && array.length) {

        let targetData = [].concat(array);
        let result = [];
        const returnFather = function(node) {
            const targetIndex = targetData.findIndex(e => (e.id == node.pid) || (e.id == node.pId))
            if (targetIndex !== -1) {
                return targetData[targetIndex]
            }
        }

        const nodeIndex = targetData.findIndex(e => (e.value == val) || (e.id == val))
        if (nodeIndex !== -1) {
            result.push(targetData[nodeIndex])
            const found = function() {
                const lastNode = result[result.length - 1];
                let father = returnFather(lastNode)
                if (father) {
                    result.push(father)
                    found()
                }
            }
            //start!
            found()
        }

        return result.reverse()
    }else{
        console.warn('getFullArray()参数异常', val, array)
    }
}