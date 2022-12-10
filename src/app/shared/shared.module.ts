import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { OwnerActionsComponent } from './owner-actions/owner-actions.component';

@NgModule({
  declarations: [OwnerActionsComponent],
  imports: [CommonModule],
  exports: [OwnerActionsComponent],
  providers: [
    {
      provide: 'token',
      useValue: new BehaviorSubject(''),
    },
  ],
})
export class SharedModule {}
