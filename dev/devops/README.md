# DevOps

## References
- https://hub.docker.com/_/node
- https://github.com/nodejs/docker-node/blob/main/README.md

## Setup the DNS for `spamfro.xyz`
```
A @ 127.0.0.1
A pills-dbs 172.19.0.101
A pills-api 172.19.0.102
A pills-app 172.19.0.103
```

## Create the network
```
docker network create \
  -d bridge \
  --subnet 172.19.0.0/16 \
  --gateway 172.19.0.1 \
  bridge-pills
```

## Run the database
```
cd .../pills/dev/dbs

docker container run --rm -d \
  --name pills-dbs \
  --network bridge-pills \
  --ip 172.19.0.101 \
  --volume "$PWD/mysql:/var/lib/mysql" \
  --env MYSQL_ROOT_PASSWORD=LikeBeingThere \
  mysql

mysql_config_editor set --host=pills-dbs.spamfro.xyz --port=3306 --user=root --password
```

## Run the backend
```
cd .../pills/dev/api

docker container run --rm -it --init \
  --name pills-api \
  --network bridge-pills \
  --ip 172.19.0.102 \
  --user node \
  --workdir /home/node/app \
  --volume "$PWD:/home/node/app" \
  --volume /mnt/ws-dbs:/mnt/ws-dbs \
  node npm run start

ssh -L 3444:172.19.0.102:3443
curl https://spamfro.xyz:3444/pills/drugs
  
```

## Run the app
```
cd .../pills/dev/app

docker container run --rm -it --init \
  --name pills-app \
  --network bridge-pills \
  --ip 172.19.0.103 \
  --user node \
  --workdir /home/node/app \
  --volume "$PWD:/home/node/app" \
  --volume /mnt/ws-dbs:/mnt/ws-dbs \
  node npm run start

ssh -L 3443:172.19.0.103:3443
curl https://spamfro.xyz:3443/
```
