/*
 * validlyFn Library v1.0.0
 *  
 * Copyright 2013-10-24, GloomHu 
 *
 * General validation and operation Foundation
 *
 * Released under GPL Licenses.
 */

/**
 * Jquery验证插件，需引用jquery
 * 
 * eg:if ($(obj).IsEmpty()) { return false }
 */
(function (window) {
    //未引用jQuery，则返回
    if (!window.$) {
        return;
    } 
    $.callFn = function (t, p, rFn) {
        // 引用默认属性
        p = $.extend({
            validateFn: false,//执行函数
            isValiFn: true,//是否验证函数，默认验证函数,返回Boolean,false执行函数,返回对象
            tipId: false,//提示控件Id，默认false
            tMsg: '',//通过的消息提示，默认空
            eMsg: '格式不符合或为空',//未通过消息提示
            tClass: false,//未指定样式,默认无
            eClass: false,//未指定样式,默认背景为红色，需设置tipId
        }, p);
        var content = t.val(), g = {
            callValidateFn: function (fn, isValiFn) {
                var rs = fn(content);
                if (isValiFn) {
                    //无指定控件，则alert出结果
                    if (p.tipId) {
                        g.buildTip(rs);

                    } else {
                        g.buildAlert(rs);
                    }
                }
                return rs;
            },
            buildTip: function (flag) {
                var tipObj = $("#" + p.tipId);
                if (!flag) {
                    if (p.eClass) {
                        tipObj.html(p.eMsg).addClass(p.eClass);
                        t.addClass(p.eClass);
                    } else {
                        tipObj.html(p.eMsg).css("color", "red");
                        t.css("backgroundColor", "red");
                    }
                } else {
                    if (p.tClass) {
                        tipObj.html(p.tMsg).addClass(p.tClass);
                        t.addClass(p.tClass);
                    } else {
                        tipObj.html(p.tMsg).css("backgroundColor", "");
                        t.css("backgroundColor", "");
                    }
                }
                return flag;
            },
            buildAlert: function (flag) {
                if (!flag) {
                    if (p.eMsg != "格式不符合或为空") {
                        alert(p.eMsg);
                    }
                }
                return flag;
            }
        };
        //改写验证函数，参数函数优先
        if (p.validateFn) {
            rFn = p.validateFn;
        }
        //内部函数
        if (rFn) {
            return g.callValidateFn(rFn, p.isValiFn);
        }
        //alert('验证函数不存在。');
        return false;
    };
    //配置函数
    $.fn.processFn = function (p) {
        return $.callFn(this, p, null);
    };
    //是否为空
    $.fn.isEmpty = function(p) {
        return $.callFn(this,p,isEmpty);
    };
    //检查手机号码
    $.fn.isMobile = function (p) {
        return $.callFn(this, p, isMobile);
    };
    ////检查座机号码
    //$.fn.isTelPhone = function (p) {
    //    return $.callFn(this, p, isTelPhone);
    //};
    //检查邮箱格式
    $.fn.isEmail = function (p) {
        return $.callFn(this, p, isEmail);
    };
    ////只包含中文和英文
    //$.fn.isGbOrEn = function (p) {
    //    return $.callFn(this, p, isGbOrEn);
    //};
    //是否纯数字
    $.fn.isNumber = function (p) {
        return $.callFn(this, p, isNumber);
    };
    ////检查是否含有非法字符
    //$.fn.isForbid = function (p) {
    //    return $.callFn(this, p, isForbid);
    //};
    //压缩空格
    $.fn.trimVal = function (p) {
        return $.callFn(this, p, trimTxt);
    };
    //检查数量
    $.fn.getLength = function (p) {
        return $.callFn(this, p, getLength);
    };
})(window);

/**
 * 判断是否是空
 * @param value
 * @returns {Boolean}
 */
function isEmpty(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null") {
        return false;
    }
    else {
        value = value.replace(/\s/g, "");
        if (value == "") {
            return false;
        }
        return true;
    }
}
/**
 * 检查手机号码
 * @param value
 * @returns {Boolean}
 */
function isMobile(value) {
    if (value) {
        var myReg = /(^18\d{9}$)|(^13\d{9}$)|(^15\d{9}$)/;
        if (!myReg.test(value)) { return false; }
        return true;
    }
    return false;
}
/**
 * 检查座机号码
 * @param value
 * @returns {Boolean}
 */
function isTelPhone(value) {
    if (value) {
        var myReg = /^[0-9]+[-]?[0-9]+[-]?[0-9]$/;
        if (!myReg.test(value)) { return false; }
        return true;
    }
    return false;
}
/**
 * 检查邮箱格式
 * @param value
 * @returns {Boolean}
 */
function isEmail(value) {
    if (value) {
        var myReg = /(^\s*)\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s*$)/;
        if (!myReg.test(value)) { return false; }
        return true;
    }
    return false;
}
/**
 * 只包含中文和英文
 * @param value
 * @returns {Boolean}
 */
function isGbOrEn(value) {
    if (value) {
        var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
        var re = new RegExp(regu);
        if (value.search(re) != -1) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}
/**
 * 是否纯数字
 * @param value
 * @returns {Boolean}
 */
function isNumber(value) {
    if (value) {
        var myReg = /^[\d]+$/;
        if (!myReg.test(value)) { return false; }
        return true;
    }
    return false;
}
/**
 * 检查是否含有非法字符isForbid
 * @param tempStr
 * @returns {Boolean}
 */
function isForbid(tempStr) {
    tempStr = trimTxt(tempStr);
    tempStr = tempStr.replace('*', "@");
    tempStr = tempStr.replace('--', "@");
    tempStr = tempStr.replace('/', "@");
    tempStr = tempStr.replace('+', "@");
    tempStr = tempStr.replace('\'', "@");
    tempStr = tempStr.replace('\\', "@");
    tempStr = tempStr.replace('$', "@");
    tempStr = tempStr.replace('^', "@");
    tempStr = tempStr.replace('.', "@");
    tempStr = tempStr.replace(';', "@");
    tempStr = tempStr.replace('<', "@");
    tempStr = tempStr.replace('>', "@");
    tempStr = tempStr.replace('"', "@");
    tempStr = tempStr.replace('=', "@");
    tempStr = tempStr.replace('{', "@");
    tempStr = tempStr.replace('}', "@");
    var forbidStr = new String('@,%,~,&');
    var forbidArray =[];
    forbidArray = forbidStr.split(',');
    for (var i = 0; i < forbidArray.length; i++) {
        if (tempStr.search(new RegExp(forbidArray[i])) != -1)
            return false;
    }
    return true;
}
/**
 * 压缩空格
 * @param value
 * @returns {Boolean}
 */
function trimTxt(value) {
    return value.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 检查数量
 * @param txtObj
 * @returns {Number}
 */
function getLength(value) {
    var valLength = 0;
    if (value) {
        for (var i = 0, len = value.length; i < len; i++) {
            var word = value.substring(i, 1);
            if (/[^\x00-\xff]/g.test(word)) {
                valLength += 2;
            } else {
                valLength++;
            }
        }
    }
    return valLength;
}