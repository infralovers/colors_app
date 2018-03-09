# colors_app

Dummy nodejs application which returns a colored paged based on color found in a variable environment.
Variable name is "COLOR".
If COLOR is empty, then "white" is used.
A color could be in the HTML form: COLOR=#0f0f0f

It is possible to pass some query string parameters to alter the behavior of the application:

* 'burncpu' will make the application to compute square roots and consume a lot of CPU resources

Its main purpose is to be used for demos :)

# Building the container

Clone this repository, go into the directory and run a command like: `docker build --tag colors .`

One can also use the docker-compose.yml file provided here: `docker-compose build`

# Using the container

## Normal usage

Use a command like this one:

  `docker run --detach --rm=true --name=colors --env=blue --hostname=colors colors`

Or use docker-compose:

  `docker-compose up -d`

## Debugging

Use a command like this one:

  `docker run -it --rm=true --name=colors --hostname=colors --env=blue --entrypoint=sh colors`

Or use docker-compose:

  `docker-compose up`

# Client

Run:

  `wrk 'http://127.0.0.1:8080/'`

To simulate high CPU usage:

  `wrk 'http://127.0.0.1:8080/?burncpu=true'`
