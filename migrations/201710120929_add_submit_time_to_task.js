
module.exports.up = async (db) => {
  await db.schema.table('task', table => {
    table.timestamp('submit_time', true);
  })
};

module.exports.down = async (db) => {
  await db.schema.table('task', table => {
    table.dropColumn('submit_time');
  })
};

module.exports.configuration = { transaction: true };
