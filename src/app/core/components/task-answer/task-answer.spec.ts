import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAnswer } from './task-answer';

describe('TaskAnswer', () => {
  let component: TaskAnswer;
  let fixture: ComponentFixture<TaskAnswer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAnswer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAnswer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
