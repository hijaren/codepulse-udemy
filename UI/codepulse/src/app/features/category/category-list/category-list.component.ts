import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
	public categories$?: Observable<Category[]>;

	constructor(
		public CategoryService: CategoryService
	) {}

	public ngOnInit(): void {
		this.categories$ = this.CategoryService.getAllCategories();
	}
}
