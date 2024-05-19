import { defineDb, defineTable, column } from 'astro:db';

const Comment = defineTable({
  columns: {
    // Una cadena de texto.
    author: column.text(),
    // Un valor entero.
    likes: column.number(),
    // Un valor verdadero o falso.
    flagged: column.boolean(),
    // Valores de fecha/hora consultados como objetos de fecha de JavaScript.
    published: column.date(),
    // Un objeto JSON sin tipo.
    metadata: column.json(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Comment}
});
