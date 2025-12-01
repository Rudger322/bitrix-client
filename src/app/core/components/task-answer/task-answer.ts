import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogTitle} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

const MAIN_URL = 'http://192.168.0.100/api/'

@Component({
  selector: 'app-task-answer',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule, FormsModule, MatButtonModule, MatDialogTitle],
  templateUrl: './task-answer.html',
  styleUrl: './task-answer.css',
})
export class TaskAnswer implements OnInit {
  answer : string = '';
  httpClient = inject(HttpClient);
  data = inject(MAT_DIALOG_DATA);
  ngOnInit() {
    console.log(this.data.value);
    this.httpClient.post(MAIN_URL + 'Submissions/getByTaskId/', { id: this.data.value }).subscribe((res: any) => {
      console.log(res);
    });
  }

  sendAnswer() {
    this.httpClient.post(MAIN_URL + 'Submissions/submitTask/', { studentId: localStorage.getItem('userId'), taskId: this.data.value, solutionText: this.answer }).subscribe((res: any) => {
      console.log(res);
    });
  }
}
