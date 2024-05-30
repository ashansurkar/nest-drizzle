import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { PG_Pool } from '../constants';

@Injectable()
export class DatabaseService {
  constructor(@Inject(PG_Pool) private readonly pool: Pool) {
    this.setupConnectionListeners();
  }

  private setupConnectionListeners() {
    console.log(
      'DatabaseService -> setupConnectionListeners -> this.pool',
      this.pool,
    );
    this.pool.on('connect', () => {
      console.log('Database connected');
    });

    this.pool.on('error', (error) => {
      console.log('Database connection error', error);
      this.reconnect();
    });

    this.pool.on('acquire', () => {
      console.log('Client checked out from pool');
    });

    this.pool.on('remove', () => {
      console.log('Client removed from pool');
      this.reconnect();
    });
  }

  private async reconnect() {
    console.log('Attempting to reconnect to the database...');
    let connected = false;
    while (!connected) {
      try {
        await this.pool.connect();
        connected = true;
        console.log('Database reconnected');
      } catch (error) {
        console.error('Reconnection attempt failed', error);
        await new Promise((res) => setTimeout(res, 1000)); // Wait before retrying
      }
    }
  }
}
