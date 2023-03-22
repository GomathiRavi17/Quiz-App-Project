import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.css']
})
export class EditResultComponent implements OnInit {



  constructor(
    private dialogRef: MatDialogRef<EditResultComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private quizService: QuizService) {
  }

  ngOnInit() {
    console.log(this.editData.id);
  }



  closeDialog(): void {
    this.dialogRef.close();
  }

  updateResult() {
    this.quizService.updateResult(this.editData).subscribe(data => {
      console.log(data);
      alert("data updated successfully!");
      this.closeDialog();
    })
  }

}
