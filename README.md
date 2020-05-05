Instalar los requerimientos:

    sudo apt install nginx python3 npm
    pip3 install -r requirements.txt
    cd static
    npm install
    cd ..

Para poder correr flask en debug, debo asignar la variable FLASK_ENV a development

    export FLASK_ENV=development

Correr la aplicación
    
    flask run

En otra pestaña, correr:

    cd static
    npm run watch

Para que se sirvan correctamente los archivos estáticos, uso la siguiente configuración de nginx:

    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    
    upstream flask {
      server 127.0.0.1:5000; 
    }
    
    server {
      listen 80;
      client_max_body_size 200G;
      root /home/alejo/playground/flask1/public;          # Editar si es requerido
      add_header Access-Control-Allow-Origin *;
      try_files $uri @flask;
      location @flask {
        proxy_pass http://flask;
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_send_timeout   600;
        proxy_read_timeout   600;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
      }
      error_page 502 /502.html;
    }


