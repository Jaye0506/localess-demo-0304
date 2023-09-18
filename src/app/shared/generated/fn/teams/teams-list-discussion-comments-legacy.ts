/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeamDiscussionComment } from '../../models/team-discussion-comment';

export interface TeamsListDiscussionCommentsLegacy$Params {

/**
 * The unique identifier of the team.
 */
  team_id: number;

/**
 * The number that identifies the discussion.
 */
  discussion_number: number;

/**
 * The direction to sort the results by.
 */
  direction?: 'asc' | 'desc';

/**
 * The number of results per page (max 100).
 */
  per_page?: number;

/**
 * Page number of the results to fetch.
 */
  page?: number;
}

export function teamsListDiscussionCommentsLegacy(http: HttpClient, rootUrl: string, params: TeamsListDiscussionCommentsLegacy$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TeamDiscussionComment>>> {
  const rb = new RequestBuilder(rootUrl, teamsListDiscussionCommentsLegacy.PATH, 'get');
  if (params) {
    rb.path('team_id', params.team_id, {});
    rb.path('discussion_number', params.discussion_number, {});
    rb.query('direction', params.direction, {});
    rb.query('per_page', params.per_page, {});
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TeamDiscussionComment>>;
    })
  );
}

teamsListDiscussionCommentsLegacy.PATH = '/teams/{team_id}/discussions/{discussion_number}/comments';
