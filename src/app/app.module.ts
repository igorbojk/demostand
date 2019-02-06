import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './modules/home/home.module';
import {CoreModule} from './core/core.module';
import {ConfigsModule} from './configs/configs.module';
import {WebsocketService} from './shared/services/websocket/websocket.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // angular
        BrowserModule,

        // 3rd party

        // core & shared
        ConfigsModule,
        CoreModule,
        SharedModule,

        // features
        HomeModule,

        // app
        AppRoutingModule
    ],
    providers: [WebsocketService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
