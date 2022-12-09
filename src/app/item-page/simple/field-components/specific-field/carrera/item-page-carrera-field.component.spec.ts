import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateLoaderMock } from '../../../../../shared/testing/translate-loader.mock';
import { MetadataValuesComponent } from '../../../../field-components/metadata-values/metadata-values.component';
import { mockItemWithMetadataFieldAndValue } from '../item-page-field.component.spec';
import { ItemPageCarreraFieldComponent } from './item-page-carrera-field.component';
import { APP_CONFIG } from '../../../../../../config/app-config.interface';
import { environment } from '../../../../../../environments/environment';

let comp: ItemPageCarreraFieldComponent;
let fixture: ComponentFixture<ItemPageCarreraFieldComponent>;

const mockValue = 'test value';
const mockField = 'dc.test';
const mockLabel = 'test label';
const mockFields = [mockField];

describe('ItemPageCarreraFieldComponent', () => {
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
      declarations: [ItemPageCarreraFieldComponent, MetadataValuesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(ItemPageCarreraFieldComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ItemPageCarreraFieldComponent);
    comp = fixture.componentInstance;
    comp.item = mockItemWithMetadataFieldAndValue(mockField, mockValue);
    comp.fields = mockFields;
    comp.label = mockLabel;
    fixture.detectChanges();
  }));

  it('should display display the correct metadata value', () => {
    expect(fixture.nativeElement.innerHTML).toContain(mockValue);
  });
});
