import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, of } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  showTimer = false;

  loading$ = new BehaviorSubject(true);

  doctors$ = this.apiService.httpGet$('/doctors').pipe(
    switchMap((doctors) => {
      return this.apiService.httpGet$('/photos').pipe(
        map((photos) => {
          return doctors.map((doctor) => ({
            ...doctor,
            photo: photos?.find((photo) => doctor.name === photo.name).img,
          }));
        })
      );
    }),
    map((doctors) => {
      console.log(doctors);

      return doctors.map((doctor) => ({
        ...doctor,
        fullName: doctor.name + ' ' + doctor.surname,
      }));
    }),
    catchError((e) => {
      console.error(e);
      return EMPTY;
    }),
    finalize(() => {
      this.loading$.next(false);
    })
  );

  ngOnInit(): void {
    // this.apiService
    //   .httpGet$('/doctors')
    //   .pipe(
    //     map((doctors) => {
    //       return doctors.map((doctor) => ({
    //         ...doctor,
    //         fullName: doctor.name + ' ' + doctor.surname,
    //       }));
    //     })
    //   )
    //   .subscribe((doctors) => {
    //     console.log(doctors);
    //     this.doctors = doctors;
    //     this.loading$.next(false);
    //   });
  }
}
