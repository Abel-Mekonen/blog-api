export class JSendResponse {
    status: string;
    data: any;
    message: string;
    stack: any;

    constructor() {
        this.status = 'success';
        this.data = undefined;
        this.message = '';
        this.stack = undefined;
    }

    success(data: any, message = "Request successful") {
        this.status = 'success';
        this.data = data;
        this.message = message;
        return this;
    }

    error(message = "Request error", stack: any = undefined) {
        this.status = 'error';
        this.message = message;
        this.stack = stack;
        return this;
    }
}