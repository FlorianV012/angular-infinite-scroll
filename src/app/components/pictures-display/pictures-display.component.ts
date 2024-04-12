import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IPhoto } from '../../interfaces/photo';

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

  photos: IPhoto[] = [];
  query: string = 'random';
  pageNumber: number = 1;
  maxPages: number = 0;
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string | null = null;

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
    this.apiService.getPhotos(this.query, this.pageNumber).subscribe(
      (data: { total_pages: number; results: IPhoto[] }) => {
        this.photos = [...this.photos, ...data.results];
        this.maxPages = data.total_pages;
        this.onPhotosLoaded();
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  loadMore() {
    if (this.pageNumber < this.maxPages) {
      this.pageNumber++;
      this.getPhotos();
    }
  }
}
