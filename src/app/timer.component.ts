import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit, OnDestroy {
  timer$ = interval(1000);

  destroyed$ = new Subject();

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  constructor() {}
  ngOnInit(): void {
    this.timer$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((val) => console.log(val));
  }
}
