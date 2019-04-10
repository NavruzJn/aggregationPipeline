import db from '../db';

function nest(task) {
  const {
    user_first_name,
    user_last_name,
    user_phone_number, ...rest} = task;

  return {
    ...rest,
    user: {
      first_name: user_first_name,
      last_name: user_last_name,
      phone_number: user_phone_number}}
}

export default function(id) {
  return db('task')
    .where({'task.id': id})
    .leftJoin('task', 'task.id', 'task.user_id')
    .first(
      'task.*',
      'user.first_name as user_first_name',
      'user.last_name as user_last_name',
      'user.phone_number as user_phone_number')
      .avg('age')
    .then(task => task && nest(task));
}
