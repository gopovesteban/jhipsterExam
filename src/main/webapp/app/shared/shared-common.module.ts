import { NgModule } from '@angular/core';

import { JhipsterExamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterExamSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterExamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterExamSharedCommonModule {}
