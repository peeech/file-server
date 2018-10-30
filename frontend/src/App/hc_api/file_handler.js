// This file contains functions handling data manipulations on files


/**
 * @param  {string} fname - File name with extension
 * @return {string} - Extension of the file
 */
export const getExtension = (fname) => {
    return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}


/**
 * Base64 encode content of the file
 * @param  {file} file - js File object read from DragDrop area
 * @return {Promise} Promise of base64 encoded content of data
 */
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
    });
}


/**
 * Create metadata object of the file form file object
 * @param  {file} file - js File object read from DragDrop area
 * @return {object} Containing  metadata of the file
 */
export const createMeta = (file) => ({
    lastModified: file.lastModified,
    name: file.name,
    path: file.path,
    size: file.size,
    type: file.type
})


/**
 * Return if an image can have preview created with help of getImageAsUrl
 * @param  {string} type - MIME type of an image
 * @return {bool} Yes or no
 */
export const canPreview = (type) => (
    type === "image/jpeg" || type === "image/png"
)


/**
 * Create image from base64 encoded content
 * @param  {object} file - file object
 * @param  {object} file.meta - file metadata
 * @param  {string} file.preview - file content base64 encoded
 * @return {string} url to the blob
 */
export const getImageAsUrl = (file) => {
    if (!canPreview(file.meta.type)) return "";

    // Format base64 back to blob-format:
    return "data:" + file.meta.type + ";base64," + file.preview;

}