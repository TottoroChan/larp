const db = require('../db');

class UserController {
  create(request, response) {
    console.log(request.body);
    const query = 'INSERT INTO public.users(id, login, name, surname, roles, password, salt ) VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5)  RETURNING *';
    const values = [request.body.login, request.body.name, request.body.surname, request.body.password, request.body.salt];

    db.query(query, values)
      .then((res) => {
        console.log(res.rows[0]);
      })
      .catch((e) => console.error(e));
  }

  get(request, response) {
    const query = 'SELECT * FROM public.users';

    db.query(query)
      .then((res) => {
        console.log(res.rows);
      })
  }

  async getOne(request, response) {
    const query = 'SELECT * FROM public.users WHERE id = $1';
    const values = [request.params.id];

    db.query(query, values)
      .then((res) => {
        console.log(res.rows[0]);
      })
      .catch((e) => console.error(e));
  }

  async update(request, response) {
    console.log(request.body);
    const query = 'UPDATE public.users SET login = $1, name = $2, surname = $3, roles = $4, password = $5, salt = $6  WHERE id = $7 RETURNING *';
    const values = [request.body.login, request.body.name, request.body.surname, request.body.roles, request.body.password, request.body.salt, request.body.id];

    db.query(query, values)
      .then((res) => {
        console.log(res.rows[0]);
      })
      .catch((e) => console.error(e));
  }

  async remove(request, response) {
    const query = 'DELETE * FROM public.users WHERE id = $1';
    const values = [request.params.id];

    db.query(query, values)
      .then((res) => {
        console.log(res.rows[0]);
      })
      .catch((e) => console.error(e));
  }
}

module.exports = new UserController();
