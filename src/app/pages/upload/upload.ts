import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-upload',
  styleUrl: './upload.scss',
  templateUrl: './upload.html',
})
export class Upload {
  private fb = inject(FormBuilder);
  today = new Date();
  sections = [
    { value: 'painting', label: 'Painting' },
    { value: 'sculpture', label: 'Sculpture' },
    { value: 'illustration', label: 'Illustration' },
    { value: 'photography', label: 'Photography' },
  ];
  visibilities = [{ value: 'public', label: 'Public' }, { value: 'private', label: 'Private' }];
  dateFormats = [
    { value: 'year', label: 'Year' },
    { value: 'exact', label: 'Exact date' },
    { value: 'circa', label: 'Approximate (circa)' },
  ];
  mediumOptions = ['Oil on canvas', 'Acrylic on canvas', 'Watercolor on paper', 'Tempera on wood'];
  techniqueOptions = ['Brush', 'Spatula', 'Impasto', 'Glaze'];
  units = ['cm', 'in'];
  licenses = [
    { value: 'all-rights-reserved', label: 'All rights reserved' },
    { value: 'cc-by', label: 'CC BY 4.0' },
    { value: 'cc-by-nc', label: 'CC BY-NC 4.0' },
  ];
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    section: ['', Validators.required],
    visibility: ['public'],
    dateFormat: ['year'],
    dateValue: ['2026'],
    medium: [''],
    technique: [''],
    width: [null as number | null, Validators.min(1)],
    height: [null as number | null, Validators.min(1)],
    unit: ['cm'],
    description: ['', Validators.maxLength(500)],
    copyrightHolder: [''],
    license: ['all-rights-reserved'],
    tags: [''],
  });
  previewUrl = signal<string | null>(null);
  fileName = signal('');
  fileError = signal('');
  successMessage = signal('');
  private fileSelection = 0;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const selection = ++this.fileSelection;
    this.previewUrl.set(null);
    this.fileName.set('');
    this.successMessage.set('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      this.fileError.set('Only JPG, PNG or WebP.');
      input.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.fileError.set('Max size is 2MB.');
      input.value = '';
      return;
    }
    this.fileError.set('');
    this.fileName.set(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (selection === this.fileSelection) this.previewUrl.set(reader.result as string);
    };
    reader.onerror = () => {
      if (selection !== this.fileSelection) return;
      this.fileName.set('');
      this.fileError.set('Unable to read this image. Please select it again.');
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  setMedium(option: string): void { this.form.patchValue({ medium: option }); }
  setTechnique(option: string): void { this.form.patchValue({ technique: option }); }

  isInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && control.touched;
  }

  publish(): void {
    this.successMessage.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.previewUrl()) {
      this.fileError.set('Select an image.');
      return;
    }
    const values = this.form.getRawValue();
    const upload = {
      id: Date.now(), ...values,
      tags: (values.tags ?? '').split(',').map(tag => tag.trim()).filter(Boolean),
      fileName: this.fileName(), uploadedAt: new Date().toISOString(),
    };
    const uploads = JSON.parse(localStorage.getItem('as_uploads') ?? '[]');
    uploads.push(upload);
    localStorage.setItem('as_uploads', JSON.stringify(uploads));
    this.successMessage.set(`Work published: "${values.title}"`);
    this.form.reset({ visibility: 'public', dateFormat: 'year', dateValue: '2026', unit: 'cm', license: 'all-rights-reserved' });
    ++this.fileSelection;
    this.previewUrl.set(null);
    this.fileName.set('');
    this.fileError.set('');
  }
}
