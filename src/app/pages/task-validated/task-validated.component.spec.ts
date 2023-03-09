import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskValidatedComponent } from './task-validated.component';

describe('TaskValidatedComponent', () => {
  let component: TaskValidatedComponent;
  let fixture: ComponentFixture<TaskValidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskValidatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskValidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
