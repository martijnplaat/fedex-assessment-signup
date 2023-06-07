import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_ROUTES } from './app/app-routing';

@Component({
  selector: 'fedex-main-app',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="flex items-center justify-center flex-col mt-6">
      <img src="/assets/fedex.png" alt="fedex-logo" class="w-64" />
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient],
        },
      }),
      HttpClientModule
    ),
  ],
});

function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
