export function host (url) {
  if (!url) return ''
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function https (url) {     // ios替换http为https
  if (WXEnvironment.platform === 'iOS' && typeof url === 'string') {
    return url.replace(/^http\:/, 'https:')
  }
  return ''
}

export function timeAgo (time) {        // 时间筛选
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {   // 分钟
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {   // 小时
    return pluralize(~~(between / 3600), ' hour')
  } else {                        // 天
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function unescape (text) {
  let res = text || '';
  [
    ['<p>', '\n'],
    ['&amp;', '&'],
    ['&amp;', '&'],
    ['&apos;', '\''],
    ['&#x27;', '\''],
    ['&#x2F;', '/'],
    ['&#39;', '\''],
    ['&#47;', '/'],
    ['&lt;', '<'],
    ['&gt;', '>'],
    ['&nbsp;', ' '],
    ['&quot;', '"']
  ].forEach(pair => {
    res = res.replace(new RegExp(pair[0], 'ig'), pair[1])
  })
  return res
}
