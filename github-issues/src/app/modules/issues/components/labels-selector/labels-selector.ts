import { Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { Issues } from '../../services/issues';

@Component({
  selector: 'issues-labels-selector',
  imports: [],
  templateUrl: './labels-selector.html',
})
export class LabelsSelector {
  labels = input.required<GitHubLabel[]>();

  issuesService = inject(Issues);

  isSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName);
  }

  onToggleLabel(labelName: string) {
    this.issuesService.toggleLabel(labelName);
  }
}
