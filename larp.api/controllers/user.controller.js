const postgres_db = require('../postgres_db');

class UserController {
  create(request, response) {
    const query =
      'INSERT INTO public.users(id, login, name, surname, roles, password, salt ) VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5)  RETURNING *';
    const values = [
      request.body.login,
      request.body.name,
      request.body.surname,
      request.body.password,
      request.body.salt,
    ];

    postgres_db
      .query(query, values)
      .then((resp) => {
        response.json(resp.rows[0]);
      })
      .catch((error) => {
        response.json(error);
      });
  }

  get(request, response) {
    const query = 'SELECT * FROM public.users_info';

    postgres_db
      .query(query)
      .then((resp) => {
        response.json(resp.rows);
      })
      .catch((error) => {
        response.json(error);
      });
  }

  getOne(request, response) {
    const query = 'SELECT * FROM public.users_info WHERE id = $1';
    const values = [request.params.id];

    postgres_db
      .query(query, values)
      .then((resp) => {
        response.json(resp.rows[0]);
      })
      .catch((error) => {
        response.json(error);
      });
  }

  update(request, response) {
    const query =
      'UPDATE public.users SET login = $1, name = $2, surname = $3, roles = $4, password = $5, salt = $6  WHERE id = $7 RETURNING *';
    const values = [
      request.body.login,
      request.body.name,
      request.body.surname,
      request.body.roles,
      request.body.password,
      request.body.salt,
      request.body.id,
    ];

    postgres_db
      .query(query, values)
      .then((resp) => {
        response.json(resp.rows[0]);
      })
      .catch((error) => {
        response.json(error);
      });
  }

  delete(request, response) {
    const query = 'DELETE FROM public.users WHERE id = $1';
    const values = [request.params.id];

    postgres_db
      .query(query, values)
      .then((resp) => {
        response.json(resp.rows[0]);
      })
      .catch((error) => {
        response.json(error);
      });
  }
}

module.exports = new UserController();
