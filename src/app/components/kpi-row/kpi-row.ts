import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../../models/models';

@Component({
  selector: 'app-kpi-row',
  standalone: true,
  imports: [DecimalPipe, MatIconModule],
  templateUrl: './kpi-row.html',
  styleUrl: './kpi-row.scss',
})
export class KpiRowComponent {
  players = input<Player[]>([]);

  total = computed(() => this.players().length);

  avgGoals = computed(() => {
    const ps = this.players();
    return ps.length ? ps.reduce((s, p) => s + (p.goals ?? 0), 0) / ps.length : 0;
  });

  avgAssists = computed(() => {
    const ps = this.players();
    return ps.length ? ps.reduce((s, p) => s + (p.assists ?? 0), 0) / ps.length : 0;
  });

  avgRating = computed(() => {
    const ps = this.players().filter(p => p.rating > 0);
    return ps.length ? ps.reduce((s, p) => s + p.rating, 0) / ps.length : 0;
  });
}
