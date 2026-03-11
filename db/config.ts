import { defineDb, defineTable, column, NOW  } from 'astro:db';

const UserStarted = defineTable({
  columns: {
    email: column.text({ unique: true}),
    country: column.text(),
    registry: column.date({ default: NOW })
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { UserStarted }
});
