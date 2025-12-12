import { inject, Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssues, getLabels } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Issues {
  selectedState = signal<State>(State.All);

  LabelsQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => getLabels(),
  }));

  issuesQuery = injectQuery(() => ({
    queryKey: ['issues', this.selectedState()],
    queryFn: () => getIssues(this.selectedState()),
  }));

  showIssuesByState(state: State) {
    this.selectedState.set(state);
  }
}
