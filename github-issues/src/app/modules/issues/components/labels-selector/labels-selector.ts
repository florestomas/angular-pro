import { Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';

@Component({
  selector: 'issues-labels-selector',
  imports: [],
  templateUrl: './labels-selector.html',
})
export class LabelsSelector {
  labels = input.required<GitHubLabel[]>();
}
