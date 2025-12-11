import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class Issue {
  private issueNumber = signal<string | null>(null);

  IssueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId);
  }
}
