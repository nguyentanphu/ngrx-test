import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseEntityService } from './course-entity.service';
import { map, tap, filter, first } from 'rxjs/operators';


@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private courseEntityService: CourseEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.courseEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.courseEntityService.getAll();
          }
          return loaded;
        }),
        filter(loaded => loaded),
        first()
      );
  }

}
