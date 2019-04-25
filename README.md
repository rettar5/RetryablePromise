# Retryable Promise

## Example
```javascript
const retryable = require('./retryable_promise');

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (0.7 < Math.random()) {
        resolve({isSuccess: true});
      } else {
        console.log('retrying...');
        reject(new Error('Failed to fetch data.'));
      }
    }, 1000);
  });
}

retryable(fetchData, {max: 2}).then((data) => {
  console.log('completed!\n', data);
}).catch((errors) => {
  if (errors) {
    if (!Array.isArray(errors)) {
      errors = [ errors ];
    }
    errors.forEach(e => console.error(e));
  }
});
```

## License
MIT

