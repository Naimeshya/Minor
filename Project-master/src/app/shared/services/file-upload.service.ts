import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  httpClient;
  handleError;
  fileToUpload
  declare yourHeadersConfig : any;

  constructor() { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    //formData.append('FileKey', fileToUpload, fileToUpload.name);

    return this.httpClient
      .post(endpoint, formData, { headers: this.yourHeadersConfig })
      .map(() => { return true; })
      .catch((e) => this.handleError(e));
}

}
