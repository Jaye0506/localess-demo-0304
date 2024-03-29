import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormErrorHandlerService } from '@core/error-handler/form-error-handler.service';
import { SchemaFieldAssets, SchemaFieldKind } from '@shared/models/schema.model';
import { MatDialog } from '@angular/material/dialog';
import { Asset, AssetFile, AssetKind } from '@shared/models/asset.model';
import { Store } from '@ngrx/store';
import { AppState } from '@core/state/core.state';
import { AssetService } from '@shared/services/asset.service';
import { Space } from '@shared/models/space.model';
import { AssetsSelectDialogComponent } from '@shared/components/assets-select-dialog/assets-select-dialog.component';
import { AssetsSelectDialogModel } from '@shared/components/assets-select-dialog/assets-select-dialog.model';
import { selectSettings } from '@core/state/settings/settings.selectors';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'll-assets-select',
  templateUrl: './assets-select.component.html',
  styleUrls: ['./assets-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsSelectComponent implements OnInit, OnDestroy {
  // Input
  form = input.required<FormArray>();
  component = input.required<SchemaFieldAssets>();
  space = input.required<Space>();

  @Output() assetsChange = new EventEmitter<string[]>();

  assets: AssetFile[] = [];
  // Subscriptions
  settings$ = this.store.select(selectSettings);

  constructor(
    private readonly fb: FormBuilder,
    readonly fe: FormErrorHandlerService,
    private readonly dialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
    private readonly store: Store<AppState>,
    private readonly assetService: AssetService
  ) {}

  ngOnInit(): void {
    //console.group('AssetsSelectComponent:ngOnInit')
    //console.log(this.form)
    this.loadData();
    //console.groupEnd()
  }

  loadData(): void {
    const ids: string[] | undefined = this.form().controls.map(it => it.value.uri as string);
    if (ids && ids.length > 0) {
      this.assetService.findByIds(this.space().id, ids).subscribe({
        next: assets => {
          const byId = new Map<string, Asset>(assets.map(item => [item.id, item]));
          // Make sure to have assets display in exactly the same order
          this.assets = ids
            .map(it => byId.get(it))
            .filter(asset => asset?.kind === AssetKind.FILE)
            .map(it => it as AssetFile);
          this.cd.markForCheck();
        },
      });
    }
  }

  openAssetSelectDialog(): void {
    this.dialog
      .open<AssetsSelectDialogComponent, AssetsSelectDialogModel, AssetFile[] | undefined>(AssetsSelectDialogComponent, {
        minWidth: '900px',
        width: 'calc(100vw - 160px)',
        maxWidth: '1280px',
        maxHeight: 'calc(100vh - 80px)',
        data: {
          spaceId: this.space().id,
          multiple: true,
          fileType: this.component().fileTypes?.at(0),
        },
      })
      .afterClosed()
      .subscribe({
        next: selectedAssets => {
          if (selectedAssets) {
            this.assets.push(...selectedAssets);
            this.form().clear();
            this.assets.forEach(it => this.form().push(this.assetToForm(it)));
            this.assetsChange.next(this.assets.map(it => it.id));
            //this.form?.root.updateValueAndValidity()
            //this.cd.markForCheck();
          }
        },
      });
  }

  assetToForm(asset: Asset): FormGroup {
    return this.fb.group({
      uri: this.fb.control(asset.id),
      kind: this.fb.control(SchemaFieldKind.ASSET),
    });
  }

  ngOnDestroy(): void {
    this.assetsChange.complete();
    //console.log("AssetsSelectComponent:ngOnDestroy")
  }

  deleteAsset(idx: number) {
    this.assets.splice(idx, 1);
    this.form().removeAt(idx);
    this.assetsChange.next(this.assets.map(it => it.id));
    //this.form?.root.updateValueAndValidity()
  }

  assetDropDrop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex === event.currentIndex) return;
    const tmp = this.form().at(event.previousIndex);
    if (tmp) {
      this.form().removeAt(event.previousIndex);
      this.form().insert(event.currentIndex, tmp);
      moveItemInArray(this.assets, event.previousIndex, event.currentIndex);
      this.assetsChange.next(this.assets.map(it => it.id));
    }
  }
}
