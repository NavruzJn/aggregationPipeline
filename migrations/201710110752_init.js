module.exports.up = async (db) => {

  await db.raw(`
    create table "author" (
      id integer not null constraint author_pkey primary key,
      first_name varchar,
      last_name varchar,
      username varchar,
      age integer,
      session jsonb,
      phone_number varchar,)`);

  await db.raw(`
    create table "task" (
      id serial not null constraint author_pkey primary key,
      user_id integer constraint task_author_id_fk references "user" on update cascade on delete cascade,
      create_time timestamp not null,
      update_time timestamp not null,
      question varchar not null,
      note text,
      status varchar not null)`);
};

module.exports.down = async (db) => {
  await db.dropTable('task');
  await db.dropTable('author');
};

module.exports.configuration = {transaction: true};
