import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const MATERIAL_IMPORTS = [
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatGridListModule
];

export const MATERIAL_DIALOGS_IMPORTS = [
  MatFormFieldModule,
  MatInputModule
]
