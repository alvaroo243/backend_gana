const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/cors'), { 
  hook: 'preHandler',
  delegator: (req, callback) => {
    const corsOptions = {
      origin: true
    }
    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  },
});
// Declare a route

const contractsRoutes = require("./routes/contracts.routes");

contractsRoutes.forEach((route) => {
  fastify.route(route);
});

// Run the server!

fastify.register(async function (fastify) {
  fastify.get('/', (req, reply) => {
    reply.send({ hello: 'world' });
  });
});

fastify.listen({ port: 3000 });