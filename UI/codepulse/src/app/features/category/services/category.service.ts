import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {

	constructor(
		private HttpClient: HttpClient
	) {}

	public addCategory(model: AddCategoryRequest): Observable<void> {
		return this.HttpClient.post<void>(`${environment.apiBaseUrl}/api/categories`, model);
	}

	public getAllCategories(): Observable<Category[]> {
		return this.HttpClient.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
	}

	public getCategoryById(id: string): Observable<Category> {
		return this.HttpClient.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`)
	}

	public updateCategory(id: string, request: AddCategoryRequest): Observable<Category> {
		return this.HttpClient.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`, request);
	}

	public deleteCategory(id: string): Observable<Category> {
		return this.HttpClient.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
	}
}
