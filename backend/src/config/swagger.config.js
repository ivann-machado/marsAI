import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'marsAI API Documentation',
			version: '1.0.0',
			description: 'Documentation for the marsAI API backend.',
		},
		servers: [
			{
				url: 'http://localhost:3000/api', // Update this based on your environment
				description: 'Development server',
			},
		],
	},
	apis: ['./src/controllers/*.js', './src/routes/*.js'], // Files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
