import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TreoCardModule } from '@treo/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { PricingSingleComponent } from 'app/modules/admin/pages/pricing/single/single.component';
import { pricingSingleRoutes } from 'app/modules/admin/pages/pricing/single/single.routing';

@NgModule({
    declarations: [
        PricingSingleComponent
    ],
    imports     : [
        RouterModule.forChild(pricingSingleRoutes),
        MatButtonModule,
        MatIconModule,
        TreoCardModule,
        SharedModule
    ]
})
export class PricingSingleModule
{
}
