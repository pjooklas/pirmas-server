const utils = {};

utils.fileExtensions = (url) => {

    const parts = url.split('?')[0].split('.');
    if (parts.length < 2) {
        return '';
    }
    return parts[parts.length - 1];
}

export { utils };