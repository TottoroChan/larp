const postgres_db = require('../postgres_db');

class ResourceController {
  create(request, response) {
    console.log(request.body);
    const query = 'INSERT INTO public.resources(id, name, description, min, max, step) VALUES (DEFAULT, $1, $2, $3, $4, $5)  RETURNING *';
    const values = [request.body.name, request.body.description, request.body.min, request.body.max, request.body.step];

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
    const query = 'SELECT * FROM public.resources';

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
    const query = 'SELECT * FROM public.resources WHERE id = $1';
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
    const query = 'UPDATE public.resources SET name = $1, description = $2, min = $3, max = $4, step = $5 WHERE id = $6 RETURNING *';
    const values = [request.body.name, request.body.description, request.body.min, request.body.max, request.body.step, request.body.id];

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
    const query = 'DELETE FROM public.resources WHERE id = $1';
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

module.exports = new ResourceController();
