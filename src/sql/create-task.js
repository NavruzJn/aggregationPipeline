import r from 'ramda';
import db from '../db';
import read from './read-task';

export default function (fields) {
  return db('task')
    .insert({
      create_time: new Date(),
      update_time: new Date(),
      status: 'created',
      ...fields})
    .returning('id')
    .then(r.head)
    .then(read);
}
