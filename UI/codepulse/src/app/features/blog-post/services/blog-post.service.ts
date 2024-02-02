import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
	providedIn: 'root',
})
export class BlogPostService {
	
	constructor(
		private HttpClient: HttpClient
	) {}
	
	public createBlogPost(data: AddBlogPost): Observable<BlogPost> {
		return this.HttpClient.post<BlogPost>(`${environment.apiBaseUrl}/api/blogpost`, data);
	}

	public getAllBlogPosts(): Observable<BlogPost[]> {
		return this.HttpClient.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogpost`);
	}

	public getBlogPostById(id: string): Observable<BlogPost> {
		return this.HttpClient.get<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`);
	}

	public getBlogPostByUrlHandle(urlhandle: string): Observable<BlogPost> {
		return this.HttpClient.get<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${urlhandle}`);
	}

	public updateBlogPostById(id: string, body: UpdateBlogPost) {
		return this.HttpClient.put<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`, body);
	}

	public deleteBlogPost(id: string): Observable<BlogPost> {
		return this.HttpClient.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`);
	}
}
