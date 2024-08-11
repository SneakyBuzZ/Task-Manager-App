export interface ApiResponseType {
    statusCode: number;
    message: string;
    data: null | {};
    success: 'Success' | 'Failure';
}

export type TaskStatus = 'ToDo' | 'OnProgress' | 'Done';
