export const template = `
# wx33.yml

# Docker build configuration
build:
  context: ./path/to/dockerfiles
  dockerfiles:
    - Dockerfile.app
    - Dockerfile.database

# Docker image names
images:
  app: my-app
  database: my-database

# Container configuration
containers:
  - name: app-container
    image: my-app
    ports:
      - host: 80
        container: 80
    volumes:
      - host: /host/app/data
        container: /container/app/data

  - name: database-container
    image: my-database
    ports:
      - host: 5432
        container: 5432
    volumes:
      - host: /host/database/data
        container: /container/database/data

# Deployment configuration
deployment:
  ssh_host: example.com
  ssh_port: 22
  ssh_user: username
  remote_path: /path/to/deployment
  nginx_config_path: /path/to/nginx-config

# SSL configuration
ssl:
  domain_name: example.com
  generate_ssl: true
  ssl_cert_path: /path/to/ssl/cert
  ssl_key_path: /path/to/ssl/key

  `;
