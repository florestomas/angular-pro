import { Component, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces';

@Component({
  selector: 'issue-comment',
  imports: [],
  templateUrl: './issue-comment.html',
})
export class IssueComment {
  issue = input.required<GitHubIssue>();
}
