import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { CourseActions } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
import { allCoursesLoaded } from './course.actions';
import { Observable } from 'rxjs';
import { Course } from './model/course';


@Injectable()
export class CourseEffects {
  private readonly loadCourses$: Observable<{ courses: Course[] }>;
  private readonly saveCourse$: Observable<any>;
  constructor(private action$: Actions, private courseHttpService: CoursesHttpService) {
    this.loadCourses$ = createEffect(
      () => this.action$
        .pipe(
          ofType(CourseActions.loadAllCourses),
          concatMap(action => this.courseHttpService.findAllCourses()),
          map(courses => allCoursesLoaded({ courses: courses }))
        )
    );

    this.saveCourse$ = createEffect(
      () => this.action$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(action => this.courseHttpService.saveCourse(action.update.id, action.update.changes))
      ),
      {dispatch: false}
    );
  }

}
