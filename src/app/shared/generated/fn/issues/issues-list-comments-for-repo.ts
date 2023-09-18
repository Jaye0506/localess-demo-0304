/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IssueComment } from '../../models/issue-comment';

export interface IssuesListCommentsForRepo$Params {

/**
 * The account owner of the repository. The name is not case sensitive.
 */
  owner: string;

/**
 * The name of the repository without the `.git` extension. The name is not case sensitive.
 */
  repo: string;

/**
 * The property to sort the results by.
 */
  sort?: 'created' | 'updated';

/**
 * Either `asc` or `desc`. Ignored without the `sort` parameter.
 */
  direction?: 'asc' | 'desc';

/**
 * Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`.
 */
  since?: string;

/**
 * The number of results per page (max 100).
 */
  per_page?: number;

/**
 * Page number of the results to fetch.
 */
  page?: number;
}

export function issuesListCommentsForRepo(http: HttpClient, rootUrl: string, params: IssuesListCommentsForRepo$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IssueComment>>> {
  const rb = new RequestBuilder(rootUrl, issuesListCommentsForRepo.PATH, 'get');
  if (params) {
    rb.path('owner', params.owner, {});
    rb.path('repo', params.repo, {});
    rb.query('sort', params.sort, {});
    rb.query('direction', params.direction, {});
    rb.query('since', params.since, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<IssueComment>>;
    })
  );
}

issuesListCommentsForRepo.PATH = '/repos/{owner}/{repo}/issues/comments';
