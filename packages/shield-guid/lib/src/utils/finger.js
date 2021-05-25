import Fingerprint2 from 'fingerprintjs2'

function getFingerData() {
  return Fingerprint2.getPromise({
    excludes: {
      availableScreenResolution: true,
      adBlock: true
    }
  }).then(components => {
    let values = components.map(component => component.value)

    return Fingerprint2.x64hash128(values.join(''), 31)
  })
}

export default function finger() {
  return new Promise(resolve => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        getFingerData()
          .then(data => resolve(data))
      })
    } else {
      setTimeout(() => {
        getFingerData()
          .then(data => resolve(data))
      }, 500)
    }
  })

}
