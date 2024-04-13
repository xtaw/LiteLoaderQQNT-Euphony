import { SingleMessage } from '../../index.js';

class Audio extends SingleMessage {

    #path;
    #duration;

    static getElementType() {
        return 4;
    }

    constructor(path, duration) {
        super();
        this.#path = path;
        this.#duration = duration;
    }

    getPath() {
        return this.#path;
    }

    getDuration() {
        return this.#duration;
    }

    async toElement() {
        const fileType = await euphonyNative.invokeNative('ns-FsApi', 'getFileType', false, this.#path);
        const fileMd5 = await euphonyNative.invokeNative('ns-FsApi', 'getFileMd5', false, this.#path);
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
            elementType: Audio.getElementType(),
            extBufForUI: '0x',
            pttElement: {
                fileName: nativeFileName,
                filePath: nativeFilePath,
                md5HexStr: fileMd5,
                fileSize,
                duration: this.#duration ?? Math.max(1, Math.round(fileSize / 1024 / 3)),
                formatType: 1,
                voiceType: 1,
                voiceChangeType: 0,
                canConvert2Text: true,
                waveAmplitudes: [
                    0, 18, 9, 23, 16, 17, 16, 15, 44, 17, 24, 20, 14, 15, 17
                ],
                fileSubId: '',
                playState: 1,
                autoConvertText: 0
            }
        };
    }

}

export default Audio