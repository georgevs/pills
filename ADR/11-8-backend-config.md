# Backend Config

The backend process needs to have a bag of properties pertaining to:
- its own server configuration: host, port, certs, etc.
- database connection configuration: host, port, password, etc.

The properties may come from different sources depending on need for flexibility and security:
- sensitive properties will be set in dot files: certs, passwords, etc.
- run properties will be set on the command line: hosts, ports, etc.
- stock properties will be set in code: predefined properties for development, stage, production, etc environments.

A `config` module will merge and transform the properties into a singleton object based on an environment selector specified on the command line.
