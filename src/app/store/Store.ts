import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
  private _state$: BehaviorSubject<T[]>;
  state$: Observable<T[]>;
  protected _originalState: T[];

  protected constructor(initialState: T[]) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
    this._originalState = [];
  }

  get state() {
    return this._state$.getValue();
  }

  setState(nextState: T[]) {
    this._state$.next(nextState);
  }
}
