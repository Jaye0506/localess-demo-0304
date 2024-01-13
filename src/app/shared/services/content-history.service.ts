import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query, QueryConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import { map } from 'rxjs/operators';
import { limit } from '@firebase/firestore';
import { ContentHistory } from '@shared/models/content-history.model';

@Injectable()
export class ContentHistoryService {
  constructor(private readonly firestore: Firestore) {}

  findAll(spaceId: string, id: string): Observable<ContentHistory[]> {
    const queryConstrains: QueryConstraint[] = [orderBy('createdAt', 'desc'), limit(20)];
    return collectionData(query(collection(this.firestore, `spaces/${spaceId}/contents/${id}/histories`), ...queryConstrains), {
      idField: 'id',
    }).pipe(
      traceUntilFirst('Firestore:ContentHistory:findAll'),
      map(it => it as ContentHistory[])
    );
  }
}
