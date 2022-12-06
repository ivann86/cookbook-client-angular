import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: 'token',
      useValue: new BehaviorSubject(''),
    },
  ],
})
export class SharedModule {}
