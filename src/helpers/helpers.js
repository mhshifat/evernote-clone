export const debounce = fn => {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, 1500);
    }
}

export const stripHtmlTags = str => {
    return str.replace(/<[^>]*>?/gm, '');
}