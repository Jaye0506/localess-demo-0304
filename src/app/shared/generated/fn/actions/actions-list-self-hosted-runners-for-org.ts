/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Runner } from '../../models/runner';

export interface ActionsListSelfHostedRunnersForOrg$Params {

/**
 * The name of a self-hosted runner.
 */
  name?: string;

/**
 * The organization name. The name is not case sensitive.
 */
  org: string;

/**
 * The number of results per page (max 100).
 */
  per_page?: number;

/**
 * Page number of the results to fetch.
 */
  page?: number;
}

export function actionsListSelfHostedRunnersForOrg(http: HttpClient, rootUrl: string, params: ActionsListSelfHostedRunnersForOrg$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'total_count': number;
'runners': Array<Runner>;
}>> {
  const rb = new RequestBuilder(rootUrl, actionsListSelfHostedRunnersForOrg.PATH, 'get');
  if (params) {
    rb.query('name', params.name, {});
    rb.path('org', params.org, {});
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
      'runners': Array<Runner>;
      }>;
    })
  );
}

actionsListSelfHostedRunnersForOrg.PATH = '/orgs/{org}/actions/runners';
