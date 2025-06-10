import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {AllCommunityModule, GridApi, GridOptions, ModuleRegistry} from 'ag-grid-community';
import {GitHubIntegrationService} from '../github-integration';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {AgGridAngular} from 'ag-grid-angular';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {catchError, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.html',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    AgGridAngular,
    MatOption,
    MatInput,
    ReactiveFormsModule
  ],
  styleUrls: ['./data-view.css']
})
export class DataViewComponent implements OnInit, OnDestroy {
  private gridApi!: GridApi;
  fb = inject(FormBuilder);
  router = inject(Router)
  githubService: GitHubIntegrationService = inject(GitHubIntegrationService)

  gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    columnDefs: [
      {field: 'sha'},
      {field: 'commit.author.name', headerName: 'Author'},
      {field: 'commit.author.email', headerName: 'Email'},
      {field: 'commit.message', headerName: 'Message', flex: 1},
    ],
    pagination: true,
    paginationPageSize: 20,
    onGridReady: (params) => {
      this.gridApi = params.api;
    }
  };
  rowData: any[] = [];
  entities: { name: string }[] = [];
  form = this.fb.group({
    entity: [''],
    organization: [''],
    repository: [''],
    search: [''],
  });
  unsubscribeAll: Subject<void> = new Subject();
  orgs = toSignal(this.githubService.fetchGitHubOrgs().pipe(catchError((err) => {
    this.router.navigate(['/integration-success'])
    return [];
  })));
  repos: WritableSignal<any> = signal([]);

  constructor() {
  }

  ngOnInit() {
    this.subscribeToFormChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  subscribeToFormChanges() {
    // React only when 'organization' field changes
    this.form.get('organization')?.valueChanges.pipe(
      takeUntil(this.unsubscribeAll),
      distinctUntilChanged()
    ).subscribe({
      next: organization => {
        if (organization) {
          this.loadOrgRepos(organization);
        }
      }
    });
    this.form.get('repository')?.valueChanges.pipe(
      takeUntil(this.unsubscribeAll),
      distinctUntilChanged()
    ).subscribe({
      next: repo => {
        if (repo) {
          this.loadRepoData(this.form.value.organization!, repo);
        }
      }
    });
    this.form.get('search')?.valueChanges.pipe(
      takeUntil(this.unsubscribeAll),
      distinctUntilChanged()
    ).subscribe({
      next: search => {
        this.onSearch(search);
      }
    })
  }

  private loadRepoData(org: string, repo: string) {
    this.githubService.fetchOrgReposCommits(org, repo).subscribe({
      next: (data: any) => {
        this.rowData = data;
        this.updateRowData();
      },
      error: () => {
        this.router.navigate(['/integration-success'])
      }
    })
  }

  private loadOrgRepos(id: string) {
    this.githubService.fetchOrgData(id).subscribe({
      next: (data: any) => {
        this.repos.set(data);
      }, error: () => {
        this.router.navigate(['/integration-success'])
      }
    })
  }

  private updateRowData() {
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }
  }

  onSearch(txt: string | null) {
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', txt || undefined);
    }
  }
}
