import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('X-Test-Key', 'qnkq1vmOLs6XBw8_dsQqG'),
  });

  return next(reqWithHeader);
};
