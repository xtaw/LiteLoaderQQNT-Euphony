import { SingleMessage } from '../../index.js';

class Image extends SingleMessage {

    #path;

    static getElementType() {
        return 2;
    }

    constructor(path) {
        super();
        this.#path = path;
    }

    getPath() {
        return this.#path;
    }

    async toElement() {
        const fileType = await euphonyNative.invokeNative('ns-FsApi', 'getFileType', false, this.#path);
        const fileMd5 = await euphonyNative.invokeNative('ns-FsApi', 'getFileMd5', false, this.#path);
        const imageSize = await euphonyNative.invokeNative('ns-FsApi', 'getImageSizeFromPath', false, this.#path);
        const fileSize = await euphonyNative.invokeNative('ns-FsApi', 'getFileSize', false, this.#path);
        const nativeFileName = `${ fileMd5 }.${ fileType.ext }`;
        const nativeFilePath = await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelMsgService/getRichMediaFilePathForGuild', false, {
            path_info: {
                md5HexStr: fileMd5,
                fileName: nativeFileName,
                elementType: 2,
                elementSubType: 0,
                thumbSize: 0,
                needCreate: true,
                downloadType: 1,
                file_uuid: ''
            }
        });
        await euphonyNative.invokeNative('ns-FsApi', 'copyFile', false, {
            fromPath: this.#path,
            toPath: nativeFilePath
        });
        return {
            elementId: '',
            elementType: Image.getElementType(),
            extBufForUI: '0x',
            picElement: {
                md5HexStr: fileMd5,
                fileSize,
                picWidth: imageSize.width,
                picHeight: imageSize.height,
                fileName: nativeFileName,
                sourcePath: nativeFilePath,
                original: true,
                picType: 1001,
                picSubType: 0,
                fileUuid: '',
                fileSubId: '',
                thumbFileSize: 0,
                summary: '',
            }
        };
    }

}

export default Image