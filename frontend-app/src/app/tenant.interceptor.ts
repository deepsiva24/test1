import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminConfig } from './admin.config';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tenantId = AdminConfig.tenantId;

    const clonedReq = req.clone({
      setHeaders: {
        'X-Tenant-ID': tenantId
      }
    });

    return next.handle(clonedReq);
  }
} 