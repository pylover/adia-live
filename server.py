#! /usr/bin/env python3
from yhttp import Application, json, validate


app = Application()


@app.route('/(?:docs|jsdist)/index.json')
@json
def get(req, *, count=5):
    return list(f'0.{i}' for i in range(int(count), 0, -1))


app.staticdirectory('/', 'public', default=True, fallback=True)
app.ready()
try:
    app.climain(['s'])
except OSError:
    print('The port is alredy taken.')
    pass
