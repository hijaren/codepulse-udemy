import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
	selector: 'app-edit-blogpost',
	templateUrl: './edit-blogpost.component.html',
	styleUrls: ['./edit-blogpost.component.css'],
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
	public id: string | null = null;
	public model?: BlogPost;
	public routeSub?: Subscription;
	public updateSub?: Subscription;
	public getSub?: Subscription;
	public categories$?: Observable<Category[]>;
	public deleteSub?: Subscription;
	public isImageSelectorVisible: boolean = false;
	public imageSelectSub?: Subscription;

	public selectedCategories?: string[];

	constructor(
		private BlogPostService: BlogPostService,
		private CategoryService: CategoryService,
		private ActivatedRoute: ActivatedRoute,
		private ImageService: ImageService,
		private Router: Router
	) {}

	public ngOnInit(): void {
		this.categories$ = this.CategoryService.getAllCategories();
		this.routeSub = this.ActivatedRoute.paramMap.subscribe({
			next: (params) => {
				this.id = params.get('id');

				if (this.id) {
					this.getSub = this.BlogPostService.getBlogPostById(
						this.id
					).subscribe({
						next: (res) => {
							this.model = res;
							this.selectedCategories = res.categories.map(
								(x) => x.id
							);
						},
					});
				}
			},
		});

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
		this.routeSub?.unsubscribe();
		this.getSub?.unsubscribe();
		this.updateSub?.unsubscribe();
		this.deleteSub?.unsubscribe();
		this.imageSelectSub?.unsubscribe();
	}

	public onDelete(): void {
		if (this.id) {
			this.deleteSub = this.BlogPostService.deleteBlogPost(
				this.id
			).subscribe({
				next: (res) => {
					this.Router.navigateByUrl('/admin/blogposts');
				},
			});
		}
	}

	public openImageSelector(): void {
		this.isImageSelectorVisible = true;
	}

	public closeImageSelector(): void {
		this.isImageSelectorVisible = false;
	}

	public onFormSubmit() {
		if (this.model && this.id) {
			var updateBlogPost: UpdateBlogPost = {
				author: this.model.author,
				content: this.model.content,
				shortDescription: this.model.shortDescription,
				featuredImageUrl: this.model.featuredImageUrl,
				isVisible: this.model.isVisible,
				publishedDate: this.model.publishedDate,
				title: this.model.title,
				urlHandle: this.model.urlHandle,
				categories: this.selectedCategories ?? [],
			};
			this.updateSub = this.BlogPostService.updateBlogPostById(
				this.id,
				updateBlogPost
			).subscribe({
				next: (res) => {
					this.Router.navigateByUrl('/admin/blogposts');
				},
			});
		}
	}
}
