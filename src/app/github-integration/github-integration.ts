import {Component, inject, OnInit} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {DatePipe} from '@angular/common';
import {GitHubIntegrationService} from '../github-integration';
import {MatIcon} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-github-integration',
  imports: [
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatIcon,
    DatePipe,
    MatButton
  ],
  templateUrl: './github-integration.html',
  styleUrl: './github-integration.css'
})
export class GithubIntegration implements OnInit {
  isConnected = false;
  connectedDate: Date | null = null;
  router = inject(Router)

  constructor(
    private githubService: GitHubIntegrationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.checkIntegrationStatus();
  }

  checkIntegrationStatus() {
    this.githubService.getIntegrationStatus().subscribe(
      (response) => {
        this.isConnected = response.connected;
        console.log('Connected', response);

        if (response.integration) {
          this.connectedDate = new Date(response.integration.connectedAt);
        }

      },
      (error) => {
        this.snackBar.open('Error checking integration status', 'Close', {
          duration: 3000
        });
      }
    );
  }

  connectGitHub() {
    this.githubService.initiateAuth();
  }

  removeIntegration() {
    this.githubService.removeIntegration().subscribe(
      () => {
        this.isConnected = false;
        this.connectedDate = null;
        this.snackBar.open('Integration removed successfully', 'Close', {
          duration: 3000
        });
      },
      (error) => {
        this.snackBar.open('Error removing integration', 'Close', {
          duration: 3000
        });
      }
    );
  }

  redirect() {
    this.router.navigate(['/data']);
  }
}
