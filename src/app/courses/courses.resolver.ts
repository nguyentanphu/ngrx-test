import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllCourses } from './course.actions';
import { selectAllCoursesLoaded } from './courses.selectors';


@Injectable()
export class CoursesResolver implements Resolve<any> {
  private loaded = false;
  constructor(private store: Store<AppState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(selectAllCoursesLoaded),
        tap((loaded) => {
          if (!this.loaded && !loaded) {
            this.loaded = true;
            this.store.dispatch(loadAllCourses());
          }
        }),
        // filter(loaded => loaded),
        first(),
        finalize(() => {
          this.loaded = false;
        })
      );
  }

}
