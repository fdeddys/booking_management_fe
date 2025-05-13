import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.scss'],
  imports: [CommonModule],
})
export class IconComponent {
  @Input() name!: string; // nama file svg (tanpa .svg)
  @Input() size = 24;
  @Input() class = ''; // tambahan class CSS jika perlu
}
