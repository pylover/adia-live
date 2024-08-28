# ADia live demo

[![Deploy](https://github.com/pylover/adia-live/actions/workflows/deploy.yml/badge.svg)](https://pylover.github.io/adia)

This is live demo implementation for the 
[ADia](https://github.com/pylover/adia) project and deployed at 
https://pylover.github.io/adia.

## Contribution

### Get started

Install the dependencies.

You need the `nodejs >= 16`, `python3` and `pip3` to install the 
[yhttp](https://github.com/yhttp/yhttp) which required by the ``server.py``.


```bash
make env
```

...then start the development server.

```bash
make lint
make serve
```

## Contribution rules

- Lint before commit
- Maximum line width: 79 characters.
- Single qoute for string literals: `'` (`'foo'`)
