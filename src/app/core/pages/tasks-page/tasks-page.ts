import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {TaskAnswer} from '../../components/task-answer/task-answer';

interface Task {
  ID: string;
  title: string;
  UF_DESCRIPTION: string;
  UF_TITLE: string;
  UF_DEADLINE: string;
  submission?: { comment: string, grade: string, solutionText: string };
}

const MAIN_URL = 'http://192.168.0.100/api/'

@Component({
  selector: 'app-tasks-page',
  imports: [],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage implements OnInit {
  router = inject(Router);
  httpClient = inject(HttpClient);
  dialog = inject(MatDialog);
  courses = signal<Task[]>([]);

  ngOnInit() {
    this.httpClient.post(MAIN_URL + 'Submissions/getCourseSubmissionsByStudent/', { courseId: this.router.url.charAt(7), studentId: localStorage.getItem('userId') }).subscribe((res: any) => {
      this.courses.set(res.result.items);
      console.log(res);
    });
  }

  addAnswer(id: string | undefined) {
    if (id) {
      this.dialog.open(TaskAnswer, {
        width: '500px',
        data: { value: id}
      })
    }
  }
}
