import { Component } from '@angular/core';
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
  constructor(private apiService: ApiService) {}

  photos: any[] = [];
  query: string = 'random';
  pageNumber: number = 1;
  maxPages: number = 0;

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.apiService
      .getPhotos(this.query, this.pageNumber)
      .subscribe((data: any) => {
        this.photos = [...this.photos, ...data.results];
        this.maxPages = data.total_pages;
      });
  }

  loadMore() {
    if (this.pageNumber < this.maxPages) {
      this.pageNumber++;
      this.getPhotos();
    }
  }
}
