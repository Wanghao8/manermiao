export default {
    debounce(fn,delay) {
        var timer = null;
        var delay = delay || 500;
        return function () {
            // var args = arguments;
            var that = this;
            // 清除上一次延时器
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(that)
            }, delay);
        }
    },
}