// export class Message {
//     constructor(
//         public text: string,
//         public timestamp: Date,
//         public user: string,
//         public session_id: number
//     ) {}
// }
export interface Message {
    text: string;
    timestamp: Date;
    user: string;
    session_id: number;
}
