import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-category',
	templateUrl: './add-category.component.html',
	styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
	public model: AddCategoryRequest;
	private addCategorySubscription?: Subscription;

	constructor(
		private CategoryService: CategoryService,
		private Router: Router
	) {
		this.model = {
			name: '',
			urlHandle: '',
		};
	}

	public ngOnDestroy(): void {
		this.addCategorySubscription?.unsubscribe();
	}

	public onFormSubmit(): void {
		this.addCategorySubscription = this.CategoryService.addCategory(this.model).subscribe({
			next: (res) => {
				console.log('This was successful!');
				this.Router.navigateByUrl('/admin/categories');
			},
			error: (err) => {},
		});
	}
}
