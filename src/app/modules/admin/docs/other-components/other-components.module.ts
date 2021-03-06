import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TreoHighlightModule } from '@treo/components/highlight';
import { TreoAlertModule } from '@treo/components/alert';
import { TreoNavigationModule } from '@treo/components/navigation';
import { TreoScrollResetModule } from '@treo/directives/scroll-reset';
import { SharedModule } from 'app/shared/shared.module';
import { OtherComponentsComponent } from 'app/modules/admin/docs/other-components/other-components.component';
import { OverviewComponent } from 'app/modules/admin/docs/other-components/common/overview/overview.component';
import { MessagesComponent } from 'app/modules/admin/docs/other-components/common/messages/messages.component';
import { NotificationsComponent } from 'app/modules/admin/docs/other-components/common/notifications/notifications.component';
import { SearchComponent } from 'app/modules/admin/docs/other-components/common/search/search.component';
import { ShortcutsComponent } from 'app/modules/admin/docs/other-components/common/shortcuts/shortcuts.component';
import { UserMenuComponent } from 'app/modules/admin/docs/other-components/common/user-menu/user-menu.component';
import { ApexChartsComponent } from 'app/modules/admin/docs/other-components/third-party/apex-charts/apex-charts.component';
import { FullCalendarComponent } from 'app/modules/admin/docs/other-components/third-party/full-calendar/full-calendar.component';
import { NgxMarkdownComponent } from 'app/modules/admin/docs/other-components/third-party/ngx-markdown/ngx-markdown.component';
import { QuillEditorComponent } from 'app/modules/admin/docs/other-components/third-party/quill-editor/quill-editor.component';
import { otherComponentsRoutes } from 'app/modules/admin/docs/other-components/other-components.routing';

@NgModule({
    declarations: [
        OtherComponentsComponent,
        OverviewComponent,
        MessagesComponent,
        NotificationsComponent,
        SearchComponent,
        ShortcutsComponent,
        UserMenuComponent,
        ApexChartsComponent,
        FullCalendarComponent,
        NgxMarkdownComponent,
        QuillEditorComponent
    ],
    imports     : [
        RouterModule.forChild(otherComponentsRoutes),
        MatIconModule,
        MatSidenavModule,
        TreoHighlightModule,
        TreoAlertModule,
        TreoNavigationModule,
        TreoScrollResetModule,
        SharedModule
    ]
})
export class OtherComponentsModule
{
}
