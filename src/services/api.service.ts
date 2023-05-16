import { Injectable } from '@angular/core';
import { combineLatest, delay, Observable, of, throwError } from 'rxjs';
import { map, switchMap, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class ApiService {
  httpGet$(url, ..._args): Observable<any> {
    return combineLatest([
      of([
        {
          name: 'John',
          surname: 'Doe',
          specialisation: 'Cardiology',
          workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        },
        {
          name: 'Andy',
          surname: 'White',
          specialisation: 'Psychiatry',
          workingDays: ['Mon', 'Tue', 'Wed', 'Thu'],
        },
        {
          name: 'Jack',
          surname: 'Black',
          specialisation: 'Surgery',
          workingDays: ['Mon', 'Tue', 'Wed', 'Fri'],
        },
      ]).pipe(delay(1000)),
      of([
        {
          name: 'John',
          img: 'https://st.depositphotos.com/1771835/1477/i/950/depositphotos_14779771-stock-photo-portrait-of-confident-young-doctor.jpg',
        },
        {
          name: 'Andy',
          img: 'https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png',
        },
        {
          name: 'Jack',
          img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Jack_Black_2006.jpg',
        },
      ]).pipe(delay(1500)),
    ]).pipe(
      // delay(1000),
      map((data) => {
        switch (url) {
          case '/doctors':
            return data[0];
          case '/photos':
            return data[1];
        }
      })
    );
  }

  // httpGet;
}
