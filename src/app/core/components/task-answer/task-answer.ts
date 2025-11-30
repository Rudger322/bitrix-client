import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

const MAIN_URL = 'http://192.168.0.100/api/'

@Component({
  selector: 'app-task-answer',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule],
  templateUrl: './task-answer.html',
  styleUrl: './task-answer.css',
})
export class TaskAnswer implements OnInit {
  httpClient = inject(HttpClient);
  data = inject(MAT_DIALOG_DATA);
  ngOnInit() {
    console.log(this.data.value);
    this.httpClient.post(MAIN_URL + 'Submissions/getByTaskId/', { id: this.data.value }).subscribe((res: any) => {
      console.log(res);
    });
  }
}
