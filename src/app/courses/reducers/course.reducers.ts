import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Course } from '../model/course';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';

// tslint:disable-next-line: no-empty-interface
export interface CoursesState extends EntityState<Course> {

}

const adapter = createEntityAdapter<Course>();

const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCourseState,
  on(CourseActions.allCoursesLoaded, (state, action) => adapter.addAll(action.courses, state))
);

