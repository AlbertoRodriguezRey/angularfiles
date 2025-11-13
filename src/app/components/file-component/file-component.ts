import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file.services';

@Component({
  selector: 'app-file-component',
  templateUrl: './file-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class FileComponent {
  selectedFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);
  isUploading = signal(false);
  uploadMessage = signal<string | null>(null);

  private fileUploadService = inject(FileUploadService);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (files?.length) {
      const file = files[0];
      this.selectedFile.set(file);
      this.uploadMessage.set(null);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadFile(): Promise<void> {
    const file = this.selectedFile();
    if (!file) return;

    this.isUploading.set(true);
    try {
      await this.fileUploadService.uploadFile(file);
      this.uploadMessage.set('✓ Fichero subido correctamente');
      this.selectedFile.set(null);
      this.imagePreview.set(null);
    } catch (error) {
      this.uploadMessage.set('✗ Error al subir el fichero');
      console.error(error);
    } finally {
      this.isUploading.set(false);
    }
  }
}