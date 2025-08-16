import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  static instance;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    Database.instance = this;
  }

  async execute(sql, params = []) {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Query execution error:', { sql, params, error });
      throw error;
    }
  }

  async close() {
    try {
      await this.pool.end();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
}

export const db = new Database();