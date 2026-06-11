import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TopScorer } from '../../models/models';

@Component({
  selector: 'app-top-scorers',
  standalone: true,
  imports: [MatIconModule, MatProgressSpinnerModule],
  templateUrl: './top-scorers.html',
  styleUrl: './top-scorers.scss',
})
export class TopScorersComponent {
  topScorers = input<TopScorer[]>([]);
  loading = input<boolean>(false);
}
