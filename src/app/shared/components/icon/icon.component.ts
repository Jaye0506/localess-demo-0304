import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'll-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  // Input
  start = input.required<string>();
  end = input.required<string>();
  animate = input.required<boolean>();
}
