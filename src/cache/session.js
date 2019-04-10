import r from 'ramda';
import db from '../db';

function wrap(key) {
  return `{${r.join(',', r.map(
    key => `"${key}"`,
    Array.isArray(key) ? key : [key]))}}`;
}

export default function(task) {
  return {
    get: key => db('task')
      .where('id', task)
      .first(db.raw('session #> ? as value', wrap(key)))
      .then(r.prop('value')),
    set: (key, value) => db('task')
      .where('id', task)
      .update('session', db.raw('jsonb_set(session, ?, ?)', [wrap(key), JSON.stringify(value)]))
      .returning('session'),
    del: key => db('task')
      .where('id', task)
      .update('session', db.raw('session #- ?', wrap(key))),
  }
};
