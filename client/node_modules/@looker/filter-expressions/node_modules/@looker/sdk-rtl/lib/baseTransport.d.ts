import type { Readable } from 'readable-stream';
import type { Authenticator, HttpMethod, IRawResponse, ITransport, ITransportSettings, SDKResponse, Values, RawObserver } from './transport';
export declare abstract class BaseTransport implements ITransport {
    protected readonly options: ITransportSettings;
    protected constructor(options: ITransportSettings);
    observer: RawObserver | undefined;
    abstract parseResponse<TSuccess, TError>(raw: IRawResponse): Promise<SDKResponse<TSuccess, TError>>;
    ok(res: IRawResponse): boolean;
    abstract rawRequest(method: HttpMethod, path: string, queryParams?: Values, body?: any, authenticator?: Authenticator, options?: Partial<ITransportSettings>): Promise<IRawResponse>;
    abstract request<TSuccess, TError>(method: HttpMethod, path: string, queryParams?: any, body?: any, authenticator?: Authenticator, options?: Partial<ITransportSettings>): Promise<SDKResponse<TSuccess, TError>>;
    abstract stream<TSuccess>(callback: (readable: Readable) => Promise<TSuccess>, method: HttpMethod, path: string, queryParams?: Values, body?: any, authenticator?: Authenticator, options?: Partial<ITransportSettings>): Promise<TSuccess>;
    makeUrl(path: string, options: Partial<ITransportSettings>, queryParams?: Values): string;
}
