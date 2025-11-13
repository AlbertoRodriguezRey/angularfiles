import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { FileModel } from '../models/filemodel';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private api = environment.urlFiles;
  private request = "/api/TestingFiles"
  private apiUrl = this.api + this.request;
  private http = inject(HttpClient);

  uploadFile(file: File): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        const payload = new FileModel(file.name, base64String);

        this.http.post(this.apiUrl, payload).subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
      };

      reader.onerror = () => reject(new Error('Error al leer el fichero'));
      reader.readAsDataURL(file);
    });
  }
}