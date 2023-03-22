export class Result {

    constructor(
        public name: string, public email: string, public quizName: string, public date: string, public answered: number, public unanswered: number,
        public correct: number, public incorrect: number,public skills: string[],public percent: number[], public startTime: string, public endTime: string, public totalAttempt: number, public attempt: number
        , public timeTaken: string
        ) { }


}