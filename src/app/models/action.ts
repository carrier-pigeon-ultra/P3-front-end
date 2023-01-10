import { Action } from 'rxjs/internal/scheduler/Action';

export interface IAction<T> extends Action<T> {
  payload: T;
}
