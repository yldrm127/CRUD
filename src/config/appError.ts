export class AppError extends Error {
    statuscode: number;
    constructor(message: string,statuscode?: number) {
        super(message);
        this.statuscode = statuscode ?? 500;
    }
    
}