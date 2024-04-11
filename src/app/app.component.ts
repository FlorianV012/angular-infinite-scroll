import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PicturesDisplayComponent } from './components/pictures-display/pictures-display.component';
import { ScrollToTopButtonComponent } from './components/scroll-to-top-button.component/scroll-to-top-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PicturesDisplayComponent, ScrollToTopButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Infinite Scroll';
}
