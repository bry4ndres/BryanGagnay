import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

constructor() { }

public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading.next(true);
  }

  hide() {
    setTimeout(() => {
      this.isLoading.next(false);
    }, 300); // I'm using a timeout to simulate a slow request
  }
}
