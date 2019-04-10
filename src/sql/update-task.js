import r from 'ramda';
import db from '../db';
import read from './read-task';

const clean = object => r.reduce(
  (acc, val) => val !== undefined
    ? r.assoc(val[0], val[1], acc)
    : acc,
  {}, r.toPairs(object));

export default function update(id, fields, condition) {
  const q = db('order')
    .update({update_time: new Date(), ...clean(fields)})
    .where({id});

  if (condition) {
    if (typeof condition === 'function')
      condition(q);
    else
      q.andWhere(condition);
  }

  return q
    .returning('id')
    .then(r.head)
    .then(read)
    .then(r.partial([fields]));
}
