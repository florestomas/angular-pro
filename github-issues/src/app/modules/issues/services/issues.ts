import { inject, Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class Issues {
  LabelsQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => getLabels(),
  }));
}
