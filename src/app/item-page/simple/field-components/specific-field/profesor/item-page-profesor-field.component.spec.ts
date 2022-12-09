import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateLoaderMock } from '../../../../../shared/testing/translate-loader.mock';
import { MetadataValuesComponent } from '../../../../field-components/metadata-values/metadata-values.component';
import { mockItemWithMetadataFieldAndValue } from '../item-page-field.component.spec';
import { ItemPageProfesorFieldComponent } from './item-page-profesor-field.component';
import { APP_CONFIG } from '../../../../../../config/app-config.interface';
import { environment } from '../../../../../../environments/environment';

let comp: ItemPageProfesorFieldComponent;
let fixture: ComponentFixture<ItemPageProfesorFieldComponent>;

const mockFields = ['dc.contributor.advisor'];
const mockValue = 'test value';

describe('ItemPageProfesorFieldComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateLoaderMock
        }
      })],
      providers: [
        { provide: APP_CONFIG, useValue: environment },
      ],
      declarations: [ItemPageProfesorFieldComponent, MetadataValuesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(ItemPageProfesorFieldComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  for (const field of mockFields) {
    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(ItemPageProfesorFieldComponent);
      comp = fixture.componentInstance;
      comp.item = mockItemWithMetadataFieldAndValue(field, mockValue);
      fixture.detectChanges();
    }));

    describe(`when the item contains metadata for ${field}`, () => {
      it('should display display the correct metadata value', () => {
        expect(fixture.nativeElement.innerHTML).toContain(mockValue);
      });
    });
  }
});
