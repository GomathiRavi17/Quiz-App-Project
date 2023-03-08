import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { distinctUntilChanged, filter, fromEvent, Subscription } from 'rxjs';
import { QuestionService } from '../service/question.service';


@Component({
  selector: 'app-fullscreen-dialog',
  templateUrl: './fullscreen-dialog.component.html',
  styleUrls: ['./fullscreen-dialog.component.css']
})
export class FullscreenDialogComponent implements OnInit{

  element:any;
  count:number=0;
  subscription!:Subscription;

  constructor(@Inject(DOCUMENT) private document: any,
  private dialogRef: MatDialogRef<FullscreenDialogComponent>,
  @Inject(MAT_DIALOG_DATA)public editData:any,
  private questionService:QuestionService){
  }

  ngOnInit(): void {
    this.element = document.documentElement;
    console.log(this.editData.id);
  }

  openFullScreen(){
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    }
    else if(this.element.webkitRequestFullscreen){
      this.element.webkitRequestFullscreen();
    }
  }

  exitFullScreen(){
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    }else if (this.document.webkitExitFullscreen) {
      this.document.webkitExitFullscreen();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateJavaQuestion(){
    this.questionService.updateJava(this.editData).subscribe(data=>{
      console.log(data);
      alert("data updated successfully!");
      this.closeDialog();
    })
  }

//   onClickEscape(){
//     const keyDowns = fromEvent(document, 'keydown').pipe(
//       filter((e:any) => e.keyCode === 27),
//       distinctUntilChanged()
//     );
//     this.subscription = keyDowns.subscribe(escpress => {
//       if (escpress.type === 'keydown') {
//         // Do your thing
//         alert("Escape key has been pressed!")
//         this.count++;
//         if(this.count===3){
//           // this.finish();
//           alert("Your attempts has been completed")
//         }
//       }
//     });

// }
}
