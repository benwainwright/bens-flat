export COLUMNS LINES COMPOSE_FORCE_NO_PREFIX

COLUMNS=$(tput cols)
LINES=$(tput lines)
COMPOSE_FORCE_NO_PREFIX=1

docker compose up --build -d 
docker compose logs -f
