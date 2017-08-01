# colors_app

Dummy nodejs application which returns a colored paged based on color found either in host header or URL path.

Its main purpose is to be used for demos :)

# Building the container

Clone this repository, go into the directory and run a command like: `docker build --tag colors .`

One can also use the docker-compose.yml file provided here: `docker-compose build`

# Using the container

## Normal usage

Use a command like this one:

  `docker run --detach --rm=true --name=colors --hostname=colors colors`

Or use docker-compose:

  `docker-compose up -d`

## Debugging

Use a command like this one:

  `docker run -it --rm=true --name=colors --hostname=colors --entrypoint=sh colors`

Or use docker-compose:

  `docker-compose up`
