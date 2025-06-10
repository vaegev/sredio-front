import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubIntegrationService {
  private apiUrl = 'http://localhost:3000/api/github';

  constructor(private http: HttpClient) {}

  // Configure HTTP options with credentials
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // This is crucial for handling cookies
    };
  }

  // Initiate GitHub OAuth
  initiateAuth(): void {
    window.location.href = `${this.apiUrl}/auth/github`;
  }

  // Get integration status
  getIntegrationStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`, this.getHttpOptions());
  }

  // Fetch GitHub data
  fetchGitHubData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`, this.getHttpOptions());
  }

  // Fetch GitHub data
  fetchGitHubOrgs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data/orgs`, this.getHttpOptions());
  }

  // Fetch GitHub data
  fetchOrgData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data/org/${id}`, this.getHttpOptions());
  }

  // Fetch GitHub data
  fetchOrgReposCommits(org: string, repo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data/org/${org}/repo/${repo}`, this.getHttpOptions());
  }

  // Remove integration
  removeIntegration(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove`, this.getHttpOptions());
  }

  // In your Angular service, add this method:
  testAuth(): Observable<any> {
    return this.http.get('http://localhost:3000/test-auth', this.getHttpOptions());
  }
}
