import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ImageService {
	public selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
		id: '',
		fileExtension: '',
		fileName: '',
		title: '',
		url: ''
	});

	constructor(private HttpClient: HttpClient) {}

	public uploadImage(
		file: File,
		fileName: string,
		title: string
	): Observable<BlogImage> {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('fileName', fileName);
		formData.append('title', title);

		return this.HttpClient.post<BlogImage>(
			`${environment.apiBaseUrl}/api/images`,
			formData
		);
	}

	public getAllImages(): Observable<BlogImage[]> {
		return this.HttpClient.get<BlogImage[]>(
			`${environment.apiBaseUrl}/api/images`
		);
	}

	public selectImage(image: BlogImage): void {
		this.selectedImage.next(image);
	}

	public onSelectImage(): Observable<BlogImage> {
		return this.selectedImage.asObservable();
	}
}
