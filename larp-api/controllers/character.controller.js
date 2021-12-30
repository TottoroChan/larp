const postgres_db = require('../postgres_db');

class CharacterController {
  create(request, response) {
    console.log(request.body);
    const query = 'INSERT INTO public.characters(id, name, user_id ) VALUES (DEFAULT, $1, $2)  RETURNING *';
    const values = [request.body.name, request.body.user_id];

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
    const query = 'SELECT * FROM public.characters_info';

    postgres_db
      .query(query)
      .then((resp) => {
        response.json(resp.rows);
      })
      .catch((error) => {
        response.json(error);
      });
  }

  async getOne(request, response) {
    const query = 'SELECT * FROM public.characters_info WHERE id = $1';
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

  async update(request, response) {
    console.log(request.body);
    const query = 'UPDATE public.characters SET name = $1 WHERE id = $2 RETURNING *';
    const values = [request.body.name, request.body.id];

    postgres_db
      .query(query, values)
      .then((resp) => {
        response.json(resp.rows[0]);
      })
      .catch((error) => {
        response.json(error);
      });
  }

  async delete(request, response) {
    const query = 'DELETE FROM public.characters WHERE id = $1';
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

module.exports = new CharacterController();
