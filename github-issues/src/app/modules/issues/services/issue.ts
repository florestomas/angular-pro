import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions';
import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Issue {
  private issueNumber = signal<string | null>(null);
  private QueryClient = injectQueryClient();

  IssueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    //enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId);
  }

  prefetchIssue(issueId: string) {
    this.QueryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
    });
  }

  setIssueData(issue: GitHubIssue) {
    this.QueryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 100, // 1 minuto
    });
  }
}
