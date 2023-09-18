/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FullRepository } from '../../models/full-repository';

export interface ReposCreateFork$Params {

/**
 * The account owner of the repository. The name is not case sensitive.
 */
  owner: string;

/**
 * The name of the repository without the `.git` extension. The name is not case sensitive.
 */
  repo: string;
      body?: {

/**
 * Optional parameter to specify the organization name if forking into an organization.
 */
'organization'?: string;

/**
 * When forking from an existing repository, a new name for the fork.
 */
'name'?: string;

/**
 * When forking from an existing repository, fork with only the default branch.
 */
'default_branch_only'?: boolean;
}
}

export function reposCreateFork(http: HttpClient, rootUrl: string, params: ReposCreateFork$Params, context?: HttpContext): Observable<StrictHttpResponse<FullRepository>> {
  const rb = new RequestBuilder(rootUrl, reposCreateFork.PATH, 'post');
  if (params) {
    rb.path('owner', params.owner, {});
    rb.path('repo', params.repo, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FullRepository>;
    })
  );
}

reposCreateFork.PATH = '/repos/{owner}/{repo}/forks';
