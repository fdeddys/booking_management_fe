import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BidiModule } from '@angular/cdk/bidi';

// project import
import { CardComponent } from './components/card/card.component';
import { CustomTranslateLoader } from './custom-translate-loader';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import { IconModule } from '@ant-design/icons-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { NgChartsModule } from 'ng2-charts';

// bootstrap import
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbModule,
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDatepickerModule
} from '@ng-bootstrap/ng-bootstrap';

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { IconComponent } from 'src/app/share/icon.component';

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Title
);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    BidiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    }),
    IconModule,
    NgChartsModule,
    IconComponent,
  ],
  exports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    TranslateModule,
    IconModule,
    BidiModule,
    NgChartsModule,
    IconComponent,
  ]
})
export class SharedModule {}
