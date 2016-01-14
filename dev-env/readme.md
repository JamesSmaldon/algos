# Development Environment Setup

## To login to VM from putty on Windows
Putty can't load the private key created by vagrant without conversion to 
.ppk format, to do this open the following private key file in puttygen:

```
.vagrant\machines\default\virtualbox\private_key
```
Then save it as key.ppk in the dev-env directory. You can then setup putty 
to use the private key file and login to vagrant@localhost:2222.
