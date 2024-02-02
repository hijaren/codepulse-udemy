import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { UpdateCategoryRequest } from '../../models/update-category-request.model';

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
	public id: string | null = null;
	public category?: Category;
	private paramsSubscription?: Subscription;
	private updateCategorySubscription?: Subscription;
	private deleteCategorySubscription?: Subscription;

	constructor(
		private ActivatedRoute: ActivatedRoute,
		private CategoryService: CategoryService,
		private Router: Router
	) {}

	public ngOnInit(): void {
		this.paramsSubscription = this.ActivatedRoute.paramMap.subscribe({
			next: (params) => {
				this.id = params.get('id');

				if (this.id) {
					this.CategoryService.getCategoryById(this.id).subscribe({
						next: (res) => {
							this.category = res;
						},
					});
				}
			},
		});
	}

	public ngOnDestroy(): void {
		this.paramsSubscription?.unsubscribe();
		this.updateCategorySubscription?.unsubscribe();
		this.deleteCategorySubscription?.unsubscribe();
	}

	public onFormSubmit(): void {
		console.log(this.category);
		const updateCategoryRequest: UpdateCategoryRequest = {
			name: this.category?.name ?? '',
			urlHandle: this.category?.urlHandle ?? '',
		};

		if (this.id) {
			this.updateCategorySubscription = this.CategoryService.updateCategory(
				this.id,
				updateCategoryRequest
			).subscribe({
				next: (res) => {
					this.Router.navigateByUrl('/admin/categories');
				},
			});
		}
	}

	public onDelete(): void {
		if (this.id) {
			this.deleteCategorySubscription = this.CategoryService.deleteCategory(this.id).subscribe({
				next: (res) => {
					this.Router.navigateByUrl('/admin/categories');
				}
			})
		}
	}
}
