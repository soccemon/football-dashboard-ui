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
    'photo', 'name', 'nationality', 'position', 'age',
    'appearances', 'goals', 'assists', 'rating',
    'passAccuracy', 'yellowCards', 'redCards',
  ];

  dataSource = new MatTableDataSource<Player>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.players();
      this.paginator?.firstPage();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
