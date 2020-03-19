---
author:
  name: "Hugo Curado"
date: 2020-03-20
linktitle: Docker as a Development Environment
type:
- post
- posts
title: Docker as a Development Environment
cover: "blog/chuttersnap-9cCeS9Sg6nU-unsplash.jpg"
---
Docker is the leading technology in microservices. As stated by Flexera's State of the Cloud Survey, as of February 27,
2019, Docker container adoption is of 57%, AWS's EKS/ECS adoption is of 44%. Showing a real tendency by developers to
move from bare metal to containers.

The article will focus on Docker essentials and answering questions like *'What is Docker?'*,
*'Is it a virtualization solution?'*, *'What are images /containers / volumes...?'*.

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
A volume is a unit of storage that allows to store data from execution to execution. By default a docker container is
ephemeral. This means that once the container is stopped (terminated) all data that is not stored in a volume is lost.

### Networks
A container can be associated to one or more networks allowing it to communicate with other containers on the same network.

## Dockerizing a Rails application for development
This configuration will work for a ruby 2.5.7 based rails application and already has node and yarn installed in the image.

### Dockerfile
*Disclaimer:* This Dockerfile is based on a ruby 2.5.7 for alpine image. There is a known imcompatibility with the therubyracer
gem which depends on libv8.

// GIST

If you took the time to read the Dokcerfile, which I hope you did, you noticed we do not copy

### docker-compose.yml

### How to run and debug the app?
