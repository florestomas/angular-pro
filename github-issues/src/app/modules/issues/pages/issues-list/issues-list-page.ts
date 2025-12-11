import { Component, inject } from '@angular/core';
import { Issues } from '../../services/issues';
import { JsonPipe } from '@angular/common';
import { LabelsSelector } from '../../components/labels-selector/labels-selector';
import { IssueItem } from '../../components/issue-item/issue-item';

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
}
