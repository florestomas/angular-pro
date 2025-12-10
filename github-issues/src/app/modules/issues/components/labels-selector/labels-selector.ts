import { Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { NgStyle } from '../../../../../../node_modules/@angular/common/common_module.d';

@Component({
  selector: 'issues-labels-selector',
  imports: [NgStyle],
  templateUrl: './labels-selector.html',
})
export class LabelsSelector {
  labels = input.required<GitHubLabel[]>();
}
