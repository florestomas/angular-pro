import { Component, inject } from '@angular/core';
import { Issues } from '../../services/issues';
import { JsonPipe } from '@angular/common';
import { LabelsSelector } from '../../components/labels-selector/labels-selector';
import { IssueItem } from '../../components/issue-item/issue-item';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  imports: [LabelsSelector, IssueItem],
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage {
  issuesService = inject(Issues);

  get labelsQuery() {
    return this.issuesService.LabelsQuery;
  }
  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  onchangeState(newState: string) {
    const state =
      {
        all: State.All,
        open: State.Open,
        closed: State.Closed,
      }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }
}
