import {Listener} from "./Listener";
import Uploader from "./Uploader";
import Interceptor from "./Interceptor";

/**
 * UploaderBuilder
 *
 */
class UploaderBuilder {
    private _retry: number = 0;//最大重试次数
    private _size: number = 4 * 1024 * 1024;//分块大小,单位字节,默认4mb
    private _chunk: boolean = false;//分块上传
    private _auto: boolean = true;//自动上传,每次选择文件后
    private _multiple: boolean = true;//是否支持多文件
    private _accept: string[] = [];//接受的文件类型
    private _compress: number = 100;//图片压缩质量
    private _crop: number[] = [];//裁剪参数[x:20,y:20,width:20,height:20]
    private _listener: Listener;//监听器
    private _tokenFunc: Function;//token获取函数
    private _tokenShare: boolean = true;//分享token,如果为false,每一次HTTP请求都需要新获取Token
    private _interceptors: Interceptor[] = [];//任务拦截器
    private _isDebug: boolean = false;//

    /**
     * 添加一个拦截器
     * @param interceptor
     * @returns {UploaderBuilder}
     */
    public interceptor(interceptor: Interceptor): UploaderBuilder {
        this._interceptors.push(interceptor);
        return this;
    }

    /**
     * 上传失败后的重传尝试次数
     * @param retry 默认0次，不尝试次重传
     * @returns {UploaderBuilder}
     */
    public retry(retry: number): UploaderBuilder {
        this._retry = retry;
        return this;
    }

    /**
     *
     * @param size 分块大小,单位字节,默认4*1024*1024字节(4mb)
     * @returns {UploaderBuilder}
     */
    private size(size: number): UploaderBuilder {
        this._size = size;
        return this;
    }

    /**
     * 选择文件后,是否自动上传
     * @param auto 默认true
     * @returns {UploaderBuilder}
     */
    public auto(auto: boolean): UploaderBuilder {
        this._auto = auto;
        return this;
    }

    /**
     * 是否支持多文件选择
     * @param multiple 默认true
     * @returns {UploaderBuilder}
     */
    public multiple(multiple: boolean): UploaderBuilder {
        this._multiple = multiple;
        return this;
    }

    /**
     * 接受上传的文件类型
     * @param accept 数组形式例如:['.png','video/*']
     *
     * 详细配置见http://www.w3schools.com/tags/att_input_accept.asp
     *
     * @returns {UploaderBuilder}
     */
    public accept(accept: string[]): UploaderBuilder {
        this._accept = accept;
        return this;
    }

    /**
     * 图片质量压缩,只在上传的文件是图片的时候有效
     * @param compress 0-100,默认100,不压缩
     * @returns {UploaderBuilder}
     */
    public compress(compress: number): UploaderBuilder {
        this._compress = compress;
        return this;
    }

    /**
     * 获取Token的函数
     * @param tokenFunc
     * @returns {UploaderBuilder}
     */
    public tokenFunc(tokenFunc): UploaderBuilder {
        this._tokenFunc = tokenFunc;
        return this;
    }

    /**
     * 上传生命周期钩子
     * @param listener
     * @returns {UploaderBuilder}
     */
    public listener(listener: Listener): UploaderBuilder {
        this._listener = listener;
        return this;
    }

    /**
     * 是否分享token,如果为false每上传一个文件都需要请求一次Token。
     * @param tokenShare
     * @returns {UploaderBuilder}
     */
    public tokenShare(tokenShare: boolean): UploaderBuilder {
        this._tokenShare = tokenShare;
        return this;
    }

    /**
     * 是否分块上传
     * @param chunk 默认false
     * @returns {UploaderBuilder}
     */
    public chunk(chunk: boolean): UploaderBuilder {
        this._chunk = chunk;
        return this;
    }

    /**
     * 是否开启debug模式
     * @param debug 默认false
     * @returns {UploaderBuilder}
     */
    public debug(debug: boolean): UploaderBuilder {
        this._isDebug = debug;
        return this;
    }

    get getRetry(): number {
        return this._retry;
    }

    get getSize(): number {
        return this._size;
    }

    get getAuto(): boolean {
        return this._auto;
    }

    get getMultiple(): boolean {
        return this._multiple;
    }

    get getAccept(): string[] {
        return this._accept;
    }

    get getCompress(): number {
        return this._compress;
    }

    get getCrop(): number[] {
        return this._crop;
    }

    get getListener(): Listener {
        return this._listener;
    }

    get getTokenFunc(): Function {
        return this._tokenFunc;
    }

    get getTokenShare(): boolean {
        return this._tokenShare;
    }

    get getChunk(): boolean {
        return this._chunk;
    }

    get getIsDebug(): boolean {
        return this._isDebug;
    }

    get getInterceptors(): Interceptor[] {
        return this._interceptors;
    }

    public build(): Uploader {
        return new Uploader(this);
    }
}

export default UploaderBuilder;