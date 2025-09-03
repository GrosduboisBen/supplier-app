import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_DIALOGS_IMPORTS, MATERIAL_IMPORTS } from 'material.import';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.scss',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      ...MATERIAL_IMPORTS,
      ...MATERIAL_DIALOGS_IMPORTS
    ],

})
export class CompanyCreateComponent {

}
