import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public blogs$?: Observable<BlogPost[]>;


	constructor(
		private BlogPostService: BlogPostService,
		private CategoryService: CategoryService
	) {}

	public ngOnInit(): void {
		this.blogs$ = this.BlogPostService.getAllBlogPosts();
	}


}
