export default function getLocalIp() {
  let RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection

  return new Promise((resolve, reject) => {
    if (!RTCPeerConnection) {
      resolve('')
      return ''
    }
    const conn = new RTCPeerConnection({})

    conn.createDataChannel('')
    conn.createOffer(offer => conn.setLocalDescription(offer), reject)
    conn.onicecandidate = ice => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        let localIp = ice.candidate.candidate.split(' ')[4] || ''

        // 如果是新版chrome，则是类似这样的字符串 5bb60458-5976-430e-87d5-0c42037b65a6.local
        // 如果是老版本chrome或者其他套壳浏览器，则是 192.168.1.1类似的真实内网ip
        if (localIp && localIp.indexOf('local') > -1) {
          localIp = localIp.replace(/\.local$/, '')
        }
        resolve(localIp)
        conn.close()
      }
    }
  })
}
