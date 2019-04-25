function _tryFn(fn, cnt, max, dur) {
  return new Promise((_res, _rej) => {
    fn().then((d) => {
      _res(d);
    }).catch((e) => {
      if (cnt < max) {
        setTimeout(() => {
          _tryFn(fn, cnt + 1, max, dur).then((d) => {
            _res(d);
          }).catch((retried) => {
            var list = [ e ];
            if (Array.isArray(retried)) {
              list.push(...retried);
            } else {
              list.push(retried);
            }
            _rej(list);
          });
        }, dur);
      } else {
        _rej([
          e,
          new Error('Method call was over of max count.')
        ]);
      }
    });
  });
}

/** Retrying Promise to max count.
 *
 * @param {Function<Promise<T>>} fn Retry target promise wrapped function.
 * @param {max: number, duration: number} op Retry options. Options have max and duration.
 * @returns {Promise<T>}
 */
function retryablePromise(fn, op) {
  op = op || {};
  max = op.max || 10;
  duration = op.duration || 0;

  return new Promise((resolve, reject) => {
    _tryFn(fn, 0, max, duration).then((d) => {
      resolve(d);
    }).catch((e) => {
      reject(e);
    });
  });
}

module.exports = retryablePromise;
