const DB = require('./models');
const Places = DB['Places'];

// Basic validate payload
const validate = (place) => {
  let flag = true;
  const fields = ['name', 'description', 'open', 'close', 'location'];

  for (let key of fields) {
    if (!place[key]) {
      flag = false;
      break;
    }
  }

  return flag;
};

// ROUTES FOR PLACES
module.exports = io => [
  {
    method: 'GET',
    path: '/api/places',
    handler: async (request, h) => {
      try {
        const data = await Places.findAll();

        return h.response({
          success: true,
          message: 'Places',
          data
        });
      } catch (e) {
        console.error('Error fetching the places', e);
        return h.response({
          success: false,
          message: 'failure',
        }).code(500);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/places',
    handler: async (request, h) => {
      const { name, description, open, close, location } = request.payload;

      if (!validate(request.payload)) {
        return h.response({
          success: false,
          message: 'Validation error',
        }).code(500);
      }

      try {
        const data = await Places.create({
          name, description, open, close, lon: location[0], lat: location[1]
        });

        // IO event
        io.emit('add', { id: data.id, ...request.payload });

        return h.response({
          success: true,
          message: 'Place created!',
          data
        })
      } catch (e) {
        console.error('Error saving the place', e);
        return h.response({
          success: false,
          message: 'failure',
        }).code(500);
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/places/{id}',
    handler: async (request, h) => {
      if (!validate(request.payload)) {
        return h.response({
          success: false,
          message: 'Validation error',
        }).code(500);
      }

      const { id, name, description, open, close, location } = request.payload;

      try {
        const place = await Places.update(
          {
            name, description, open, close, lon: location[0], lat: location[1]
          },
          { where: { id } }
        );

        // IO event
        io.emit('update', request.payload);

        return h.response({
          success: true,
          message: 'Place updated!',
          data: place
        })
      } catch (e) {
        console.error('Error saving the place', e);
        return h.response({
          success: false,
          message: 'failure',
        }).code(500);
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/places/{id}',
    handler: async (request, h) => {
      const { id } = request.params;

      try {
        await Places.destroy({ where: { id } });

        // IO EVENT
        io.emit('delete', id);

        return h.response({
          success: true,
          message: 'Place deleted :('
        })
      } catch (e) {
        console.error('Error removing', e);
        return h.response({
          success: false,
          message: 'failure',
        }).code(500);
      }
    }
  }
];