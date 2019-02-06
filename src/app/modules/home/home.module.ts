import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeTopComponent } from './home-top/home-top.component';
import { HomeBottomComponent } from './home-bottom/home-bottom.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeInfoComponent } from './home-info/home-info.component';
import { HomeStatusComponent } from './home-status/home-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        HomeComponent,
        HomeTopComponent,
        HomeBottomComponent,
        HomeBodyComponent,
        HomeStatusComponent,
        HomeInfoComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        HttpClientModule,
        HttpModule,
    ],
    providers: [],
    bootstrap: []
})
export class HomeModule {

}
