import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FollowCourse} from '../../components/follow-course/follow-course';
interface Course {
  ID?: number;
  UF_TITLE?: string;
  UF_DESCRIPTION?: string;
  author?: string;
  UF_CREATED_AT?: any;
}

const MAIN_URL = 'http://192.168.0.100/api/'

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  httpClient = inject(HttpClient);
  router = inject(Router);
  dialog = inject(MatDialog);
  courses = signal<Course[]>([]);
  role: string | null = '';
  userId: string | null = '';
  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    if (this.userId !== null) {
      this.httpClient.post(MAIN_URL + 'Courses/getCoursesByStudentId/', { studentId: this.userId }).subscribe((res: any) => {
        if (res.result.items) {
          this.courses.set(res.result.items)
        }
      });
    }
  }

  goToCourse(courseId: number | undefined) {
    console.log(courseId);
    if (courseId) {
      this.router.navigate(['/tasks', courseId]);
    }
  }

  getRole(): string | null {
    return this.role;
  }

  addCourse() {
    this.dialog.open(
      FollowCourse, {
        width: '500px',
      }
    )
  }
}
