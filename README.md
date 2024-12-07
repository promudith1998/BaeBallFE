server: {
host: true,
proxy: {
'/api': 'http://172.16.9.8:6789',
},
port: PORT,
},
preview: { port: PORT, host: true },
