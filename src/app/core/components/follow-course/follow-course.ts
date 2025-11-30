import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
interface Course {
  ID?: number;
  UF_TITLE?: string;
  UF_DESCRIPTION?: string;
  author?: string;
  UF_CREATED_AT?: any;
}

const MAIN_URL = 'http://192.168.0.100/api/'

@Component({
  selector: 'app-follow-course',
  imports: [],
  templateUrl: './follow-course.html',
  styleUrl: './follow-course.css',
})
export class FollowCourse implements OnInit {
  httpClient = inject(HttpClient);
  dialog = inject(MatDialog);
  userId = localStorage.getItem('userId');
  courses = signal<Course[]>([]);

  ngOnInit() {
    this.httpClient.post(MAIN_URL + 'Courses/getAvailableCourseByStudentId/', { studentId: this.userId }).subscribe((res: any) => {
      this.courses.set(res.result.items);
    });
  }

  addCourse(id: number | undefined): void {
    if (id) {
      this.httpClient.post(MAIN_URL + 'Courses/enrollStudent/', { studentId: this.userId, courseId: id }).subscribe((res: any) => {
        alert(res.result.status);
        this.dialog.closeAll();
      });
    }
  }
}
