import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pictures-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pictures-display.component.html',
  styleUrl: './pictures-display.component.scss',
})
export class PicturesDisplayComponent {
  constructor(
    private apiService: ApiService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  photos: any[] = [];
  query: string = 'random';
  pageNumber: number = 1;
  maxPages: number = 0;

  ngOnInit() {
    this.getPhotos();
  }

  onPhotosLoaded() {
    this.cdr.detectChanges();

    this.checkIfLastLiIsVisible();
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onWindowEvent(): void {
    this.checkIfLastLiIsVisible();
  }

  checkIfLastLiIsVisible(): void {
    const lastLiElement =
      this.elementRef.nativeElement.querySelector('ul li:last-child');
    if (lastLiElement) {
      const lastLiPosition = lastLiElement.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (lastLiPosition <= windowHeight) {
        this.loadMore();
      }
    }
  }

  getPhotos() {
    this.apiService
      .getPhotos(this.query, this.pageNumber)
      .subscribe((data: any) => {
        this.photos = [...this.photos, ...data.results];
        this.maxPages = data.total_pages;
        // console.log(data.results);
        this.onPhotosLoaded();
      });
  }

  loadMore() {
    console.log(`${this.pageNumber}/${this.maxPages}`);

    if (this.pageNumber < this.maxPages) {
      this.pageNumber++;
      this.getPhotos();
    }
  }
}
