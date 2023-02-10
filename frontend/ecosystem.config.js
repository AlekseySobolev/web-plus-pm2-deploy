const dotenv = require('dotenv');

dotenv.config({path: '.env.deploy'});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'frontend',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/AlekseySobolev/web-plus-pm2-deploy/frontend',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy-local': 'npm i && npm run build',
    },
  },
};