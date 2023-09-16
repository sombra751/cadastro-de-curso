import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { filter, map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';



export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((event: HttpEvent<T>) => {
      const response = event as HttpResponse<T>;
      return response.body;
    })
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      if (event.total !== undefined) {
      cb(Math.round((event.loaded * 100) / event.total))
      }
    }
  });
}
