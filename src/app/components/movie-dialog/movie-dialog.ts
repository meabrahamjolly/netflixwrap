```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-dialog.html',
  styleUrl: './movie-dialog.scss'
})
export class MovieDialog {
  dialogService = inject(DialogService);
  
  close() {
    this.dialogService.close();
  }

  play() {
      // Mock play
      alert('Playing movie...');
  }
}
```
