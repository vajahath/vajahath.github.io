importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

const obj = {
  executeTask(task) {
    let i = task;
    let j = 0;
    for (; j < 50000000; j++) { }
    return i;
  },
  test: 'hii'
}

Comlink.expose(obj);
