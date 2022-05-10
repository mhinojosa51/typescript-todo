export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
