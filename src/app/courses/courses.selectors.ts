import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, selectAll } from './reducers/course.reducers';

const coursesFeatureSelector = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  coursesFeatureSelector,
  selectAll
);

export const selectBeginnerCourses = createSelector(selectAllCourses, courses =>
  courses.filter(c => c.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(selectAllCourses, courses =>
  courses.filter(c => c.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.promo).length
);

export const selectAllCoursesLoaded = createSelector(
  coursesFeatureSelector,
  state => state.allCoursesLoaded
);
