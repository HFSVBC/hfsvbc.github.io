---
author:
  name: "Hugo Curado"
date: 2020-04-
linktitle: Docker as a Development Environment
type:
- post
- posts
title: Docker as a Development Environment
cover: "blog/chuttersnap-9cCeS9Sg6nU-unsplash.jpg"
---
Docker is the leading technology in microservices. As stated by Flexera's State of the Cloud Survey, of February 27,
2019, Docker container adoption is of 57%, AWS's EKS/ECS adoption is of 44%. Showing a real tendency by developers to
move from bare metal to containers.

The article will focus on Docker essentials and answering questions like *'What is Docker?'*,
*'Is it a virtualization solution?'*, *'What are images/containers/volumes...?'*.

## Some key concepts
### Containers
A container is a standardized unit of software that allows you to run your application independent of host conditions,
making sure the application runs under the same conditions. This does not mean Docker (or any other container manager) is
a visualization solution. Contrary to a virtual machine a container shares the host OS making it lighter and potentially
faster.

### Images
Images contain the application code as well as the necessary libraries and runtime(s) to execute the application. An image
becomes a container when it is executed. An image is built from a set of instructions defined in a Dockerfile. It is also
possible to find images in [hub.docker.com](https://hub.docker.com).

### Volumes
A volume is a unit of storage that allows storing data from execution to execution. By default a docker container is
ephemeral. This means that once the container is stopped (terminated) all data not stored in a volume is lost.

### Networks
A container can be associated with one or more networks allowing it to communicate with other containers on the same network.

## Dockerizing a Rails application for development
This configuration will work for a ruby 2.5.7 based rails application and already has nodejs and yarn installed in the image.

### Dockerfile
*Disclaimer:* This Dockerfile is based on a ruby 2.5.7 for Alpine image. There is a known incompatibility with the *therubyracer*
gem which depends on libv8.

{{< gist hfsvbc b8c9834a38be40e17d204a6e1167447e "Dockerfile" >}}

If you took the time to read the Dokcerfile, which I hope you did, you noticed the application code is not copied all at once.
Docker best practices encourage you to first copy application dependencies (Gemfile, Package.json, ...) and install them and only
after to copy the project code. This approach allows for faster build times since the application code usually changes faster than
the application dependencies. Docker achieves faster build times by caching Image layers (an Image layer is a command execution,
ex: CMD, RUN, COPY, ...), if a layer does not change from the previous build it won't rebuild it.

Looking at the Dockerfile it is possible to gather some important information about the runtime environment of the application we
are dockerizing:
- it uses ruby 2.5.7 compiled for the Alpine distribution (a smaller Linux distribution built to be run inside Docker)
  ```Dockerfile
  FROM ruby:2.5.7-alpine AS builder
- some arguments that will be used during build time, some of them have predefined values, and there an assignment to env vars
  ```Dockerfile
  ARG BUNDLE_WITHOUT
  [...]
  ARG FREEZE_BUNDLE=true
  [...]

  ENV BUNDLE_WITHOUT ${BUNDLE_WITHOUT}
  [...]
  ENV INSTALL_PATH /app
  [...]
- what system dependencies the application has
  ```Dockerfile
  RUN apk add --no-cache alpine-sdk postgresql-client postgresql-dev nodejs yarn ${EXTRA_PACKAGES}
- the gems and js packages installation
- the copy of the application code
  ```Dockerfile
  ADD . .
- that the container will expose port 3000
- and the command it will execute if a command is not specified
  ```Dockerfile
  CMD ["bundle", "exec", "puma", "-C", "/app/config/puma.rb"]
### docker-compose.yml
{{< gist hfsvbc b8c9834a38be40e17d204a6e1167447e "docker-compose.yml" >}}

Docker-compose is a docker component that allows configuring different services and how they interact with each other. Each service
is comprised of a container. In the example `docker-compose.yml` there are 4 services defined, one per application resource. The first
one describes the `app` service which is the rails application. The second one is the `worker` responsible for running sidekiq using part
of the same configuration defined by the `app` service. The other two services are the DB, a `PostgreSQL` container, and the Redis
service.

Taking the app service into consideration it is possible to observe some configurations:
- **image:** this parameter will attribute the image name after the image build
- **build:** describes how the image is built
  - **context:** defines where the build command will be executed, a `.` represents the current directory
  - **args:** sets the arguments that will be passed to the image during build time (same arguments as mentioned above)
- **command:** defines the command that will be run during runtime, overrides the `CMD` defined on the `Dockerfile`
- **stdin_open/tty:** these parameters are set to allow to issue commands when attaching to a running container for debugging, it should not be used in production
- **environment/env_file:** sets runtime environment variables
- **ports:** maps host and container ports for bridged network configuration
- **depends_on:** defines the order by which the services are started
- **volumes:** maps external volumes to container paths allowing for data to be stored from one execution to the other


### How to run and debug the app?
#### Running the app
The first step is to build all of the services described in the `docker-compose.yml` file. It will also create the default network and
any volumes you have defined.

*Disclaimer:* this `docker-compose.yml` configuration mounts your local project folder inside the container project folder, thus removing the
necessity of building the image at any code change.
```shell
$ docker-compose build
```

The second step is to run the app. We have several options:
- Run every service in the foreground
  ```shell
  $ docker-compose up
- Run every service in the background
  ```shell
  $ docker-compose up -d
- Only start a specific service
  ```shell
  $ docker-compose up <service, ex.: app>
#### Tailing logs
Like the `up` command also with the `logs` command, there is the option to tail logs for every service or just one of the services
```shell
$ docker-compose logs -f
```

```shell
$ docker-compose logs -f <service, ex.: app>
```

#### Executing a command inside a running container
Sometimes you need to execute a command inside a running container. That's the purpose of the `exec` command
```shell
$ docker-compose exec <service, ex.: app> <command, ex.: top>
```

#### Running a command inside a new container
For some tasks, it is not advised to run a command inside a running container. That's the purpose of the `run` command
```shell
$ docker-compose run <service, ex.: app> <command, ex.: docker/restore_database.sh>
```

#### Debugging a running application
Should there be the need to debug the application with a `binding.pry` you will need to attach to the running container. By default this is not an
easy task with docker. That's why we introduced the `stdin_open/tty` settings in the `docker-compose.yml` file for the app service.
1. Issue a docker ps to get the running containers
  ```shell
  $ docker ps
  CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
  5b5af2b45984        pdf_service         "bundle exec sidekiq"    8 minutes ago       Up 7 minutes        3000/tcp                 icn-pdf-service_worker_1
  8d365bf441c3        pdf_service         "/entrypoint.sh"         8 minutes ago       Up 7 minutes        0.0.0.0:3000->3000/tcp   icn-pdf-service_app_1
  96d90169a904        redis:alpine        "docker-entrypoint.s…"   10 minutes ago      Up 7 minutes        6379/tcp                 icn-pdf-service_redis_1
  ```
2. Attach to the container running the app, in this case `8d365bf441c3` (or `8d3`)
  ```shell
  $ docker attach 8d3
  ```
3. Use `binding.pry` as you normally do

## Some usefull links
- [Docker Cheat Sheet](https://www.docker.com/sites/default/files/d8/2019-09/docker-cheat-sheet.pdf)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Docs](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/compose-file/)
