import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Course, compareCourses } from '../model/course';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';

// tslint:disable-next-line: no-empty-interface
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCourseState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addAll(action.courses, {
      ...state,
      allCoursesLoaded: true
    })
  )
);

export const { selectAll } = adapter.getSelectors();
