'use strict;'

function type (obj) {
    var type;
    if (obj == null) {
        type = String(obj);
    } else {
        type = toString.call(obj).toLowerCase();
        type = type.substring(8, type.length - 1);
    }
    return type;
};
/**
 *  封装网络请求接口，在此处代理失败重试与数据缓存
 **/
function request (/*url, [params], success, [error], [options]*/) {

    var args = Array.prototype.slice.call(arguments),
        ajaxOptions,
        params, success, error, options,
        errorArgIndex;

    // 此处实现参数重载
    if (type(args[1]) == 'object') {
        params = args[1];
        success = args[2];
        errorArgIndex = 3; // 标识带判断error参数位置

    } else {
        params = {};
        success = args[1];
        errorArgIndex = 2; // 标识带判断error参数位置
    }
    // 获取error参数
    type(args[errorArgIndex]) == 'function' && (error = args[errorArgIndex]);
    // 获取option参数
    type(args[args.length - 1]) == 'object' && (options = args.pop());
    options || (options = {});


    ajaxOptions = {
        url: api,
        type: options.type || 'get',
        data: params,
        success: success,
        error: error,
    });
    
    // 添加可选参数
    options.timeout && (ajaxOptions.timeout = options.timeout);
    options.headers && (ajaxOptions.headers = options.headers);
    options.progress && (ajaxOptions.progress = options.progress);

    $.ajax(ajaxOptions);
};

module.exports = request;