export class Result{

    constructor(public qId:number,public sOption:string,public cOption:boolean,public answer:string){
        this.qId = qId;
        this.answer=answer;
        this.sOption=sOption;
        this.cOption=cOption;
    }

}