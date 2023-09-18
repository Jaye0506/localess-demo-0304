/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IssueSearchResultItem } from '../../models/issue-search-result-item';

export interface SearchIssuesAndPullRequests$Params {

/**
 * The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching issues and pull requests](https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests)" for a detailed list of qualifiers.
 */
  q: string;

/**
 * Sorts the results of your query by the number of `comments`, `reactions`, `reactions-+1`, `reactions--1`, `reactions-smile`, `reactions-thinking_face`, `reactions-heart`, `reactions-tada`, or `interactions`. You can also sort results by how recently the items were `created` or `updated`, Default: [best match](https://docs.github.com/rest/search/search#ranking-search-results)
 */
  sort?: 'comments' | 'reactions' | 'reactions-+1' | 'reactions--1' | 'reactions-smile' | 'reactions-thinking_face' | 'reactions-heart' | 'reactions-tada' | 'interactions' | 'created' | 'updated';

/**
 * Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`.
 */
  order?: 'desc' | 'asc';

/**
 * The number of results per page (max 100).
 */
  per_page?: number;

/**
 * Page number of the results to fetch.
 */
  page?: number;
}

export function searchIssuesAndPullRequests(http: HttpClient, rootUrl: string, params: SearchIssuesAndPullRequests$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'total_count': number;
'incomplete_results': boolean;
'items': Array<IssueSearchResultItem>;
}>> {
  const rb = new RequestBuilder(rootUrl, searchIssuesAndPullRequests.PATH, 'get');
  if (params) {
    rb.query('q', params.q, {});
    rb.query('sort', params.sort, {});
    rb.query('order', params.order, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'total_count': number;
      'incomplete_results': boolean;
      'items': Array<IssueSearchResultItem>;
      }>;
    })
  );
}

searchIssuesAndPullRequests.PATH = '/search/issues';
