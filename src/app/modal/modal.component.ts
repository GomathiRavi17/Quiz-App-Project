import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
 elem:any;

  constructor(
     private dialogRef: MatDialogRef<ModalComponent>,  
     @Inject(DOCUMENT) private document: any,
     @Inject(MAT_DIALOG_DATA) public data: any
     ){
    dialogRef.disableClose = true;  
  }

  ngOnInit(){
    this.elem = this.document.documentElement;
  }


  openFullscreen() {
    if(this.data.attempt!=0){
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.dialogRef.close(true)
  }
  else{
    this.dialogRef.close(true)
  }
}

}
