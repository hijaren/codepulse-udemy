import { Component, OnDestroy } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
	selector: 'app-add-blogpost',
	templateUrl: './add-blogpost.component.html',
	styleUrls: ['./add-blogpost.component.css'],
})
export class AddBlogpostComponent implements OnDestroy {
	public model: AddBlogPost;
	public categories$?: Observable<Category[]>;
	public isImageSelectorVisible: boolean = false;
	public imageSelectSub?: Subscription;

	private createBlogPostSubscription?: Subscription;

	constructor(
		private BlogPostService: BlogPostService,
		private Router: Router,
		private CategoryService: CategoryService,
		private ImageService: ImageService
	) {
		this.model = {
			title: '',
			shortDescription: '',
			urlHandle: '',
			featuredImageUrl: '',
			content: '',
			isVisible: false,
			author: '',
			publishedDate: new Date(),
			categories: [],
		};
	}

	public ngOnInit(): void {
		this.categories$ = this.CategoryService.getAllCategories();

		this.imageSelectSub = this.ImageService.onSelectImage().subscribe({
			next: (res) => {
				if (this.model) {
					this.model.featuredImageUrl = res.url;
					this.isImageSelectorVisible = false;
				}
			},
		});
	}

	public ngOnDestroy(): void {
		this.createBlogPostSubscription?.unsubscribe();
		this.imageSelectSub?.unsubscribe();
	}

	public onFormSubmit(): void {
		console.log('jann model', this.model);
		this.createBlogPostSubscription = this.BlogPostService.createBlogPost(
			this.model
		).subscribe({
			next: (res) => {
				this.Router.navigateByUrl('/admin/blogposts');
			},
		});
	}

	public openImageSelector(): void {
		this.isImageSelectorVisible = true;
	}

	public closeImageSelector(): void {
		this.isImageSelectorVisible = false;
	}
}
