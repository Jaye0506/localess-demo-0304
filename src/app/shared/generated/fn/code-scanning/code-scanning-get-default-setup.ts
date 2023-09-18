/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CodeScanningDefaultSetup } from '../../models/code-scanning-default-setup';

export interface CodeScanningGetDefaultSetup$Params {

/**
 * The account owner of the repository. The name is not case sensitive.
 */
  owner: string;

/**
 * The name of the repository without the `.git` extension. The name is not case sensitive.
 */
  repo: string;
}

export function codeScanningGetDefaultSetup(http: HttpClient, rootUrl: string, params: CodeScanningGetDefaultSetup$Params, context?: HttpContext): Observable<StrictHttpResponse<CodeScanningDefaultSetup>> {
  const rb = new RequestBuilder(rootUrl, codeScanningGetDefaultSetup.PATH, 'get');
  if (params) {
    rb.path('owner', params.owner, {});
    rb.path('repo', params.repo, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CodeScanningDefaultSetup>;
    })
  );
}

codeScanningGetDefaultSetup.PATH = '/repos/{owner}/{repo}/code-scanning/default-setup';
