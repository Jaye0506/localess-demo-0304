import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddDialogModel} from './add-dialog.model';
import {SchemasValidator} from '@shared/validators/schemas.validator';
import {FormErrorHandlerService} from '@core/error-handler/form-error-handler.service';
import {CommonValidator} from '@shared/validators/common.validator';
import {SchemaType} from '@shared/models/schema.model';

@Component({
  selector: 'll-schema-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent {

  types: string[] = Object.keys(SchemaType);

  form: FormGroup = this.fb.group({
    name: this.fb.control('', [...SchemasValidator.NAME, CommonValidator.reservedName(this.data.reservedNames)]),
    displayName: this.fb.control<string | undefined>(undefined, SchemasValidator.DISPLAY_NAME),
    type: this.fb.control(SchemaType.ROOT, SchemasValidator.TYPE)
  });

  constructor(
    private readonly fb: FormBuilder,
    readonly fe: FormErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogModel
  ) {
  }
}
