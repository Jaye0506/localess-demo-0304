/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SocialAccount } from '../../models/social-account';

export interface UsersListSocialAccountsForAuthenticatedUser$Params {

/**
 * The number of results per page (max 100).
 */
  per_page?: number;

/**
 * Page number of the results to fetch.
 */
  page?: number;
}

export function usersListSocialAccountsForAuthenticatedUser(http: HttpClient, rootUrl: string, params?: UsersListSocialAccountsForAuthenticatedUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SocialAccount>>> {
  const rb = new RequestBuilder(rootUrl, usersListSocialAccountsForAuthenticatedUser.PATH, 'get');
  if (params) {
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SocialAccount>>;
    })
  );
}

usersListSocialAccountsForAuthenticatedUser.PATH = '/user/social_accounts';
