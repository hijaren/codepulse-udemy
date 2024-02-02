import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-image-selector',
	templateUrl: './image-selector.component.html',
	styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
	private file?: File;
	public fileName: string = '';
	public title: string = '';

	public images$?: Observable<BlogImage[]>;

	@ViewChild('form', { static: false }) public imageUploadForm?: NgForm;

	constructor(private ImageService: ImageService) {}

	public ngOnInit(): void {
		this.getImages();
	}

	public selectImage(image: BlogImage): void {
		this.ImageService.selectImage(image);
	}

	public onFileUploadChange(event: Event): void {
		const el = event.currentTarget as HTMLInputElement;
		this.file = el.files?.[0];
	}

	public uploadImage(): void {
		if (this.file && this.fileName && this.title) {
			this.ImageService.uploadImage(
				this.file,
				this.fileName,
				this.title
			).subscribe({
				next: (res) => {
					this.getImages();
					this.imageUploadForm?.resetForm();
					console.log('jann', res);
				},
			});
		}
	}

	private getImages() {
		this.images$ = this.ImageService.getAllImages();
	}
}
