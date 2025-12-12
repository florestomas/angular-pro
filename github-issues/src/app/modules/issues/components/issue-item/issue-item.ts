import { Component, inject, input } from '@angular/core';
import { GitHubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Issue } from '../../services/issue';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, CommonModule],
  templateUrl: './issue-item.html',
})
export class IssueItem {
  issue = input.required<GitHubIssue>();
  issueService = inject(Issue);

  get isOpen() {
    return this.issue().state === State.Open;
  }
  prefetchData() {
    //this.issueService.prefetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
  }
}
