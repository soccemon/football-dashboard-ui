import { Component, ViewChild, AfterViewInit, effect, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../../models/models';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    DecimalPipe,
  ],
  templateUrl: './player-table.html',
  styleUrl: './player-table.scss',
})
export class PlayerTableComponent implements AfterViewInit {
  players = input<Player[]>([]);
  loading = input<boolean>(false);
  emptyMessage = input<string>('No players found.');

  readonly displayedColumns = [
    'photo', 'name', 'team', 'nationality', 'position', 'age',
    'appearances', 'goals', 'assists', 'rating',
    'passAccuracy', 'yellowCards', 'redCards',
  ];

  dataSource = new MatTableDataSource<Player>([]);

  private static readonly POSITION_ORDER: Record<string, number> = { GK: 0, DEF: 1, MID: 2, FWD: 3 };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.players();
      if (this.paginator) this.paginator.firstPage();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sort({ id: 'rating', start: 'desc', disableClear: false });
    this.dataSource.sortingDataAccessor = (player, column) => {
      if (column === 'position') {
        return PlayerTableComponent.POSITION_ORDER[player.position] ?? 99;
      }
      const val = (player as any)[column];
      return val ?? -Infinity;
    };
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
