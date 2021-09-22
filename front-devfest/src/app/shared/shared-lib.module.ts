import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ChargementComponent} from './loader/loader.component';
import {SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
import {AnnulationWorkflowComponent} from './annulation-workflow/annulation-workflow.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};


@NgModule({
    declarations: [ChargementComponent, AnnulationWorkflowComponent],
    imports: [
        CommonModule,
        NgxDatatableModule,
        SwiperModule,
        AngularSvgIconModule.forRoot()
    ],
    exports: [
        CommonModule,
        NgxDatatableModule,
        SwiperModule,
        AngularSvgIconModule,
        ChargementComponent,
        AnnulationWorkflowComponent
    ],
    providers: [],
})
export class SharedLibModule { }
