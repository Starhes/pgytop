export async function onRequest(context) {
  // 从环境变量中获取目标 URL
  const proxyUrl = context.env.PROXY_URL;

  if (!proxyUrl) {
    return new Response('PROXY_URL environment variable not set', { status: 500 });
  }

  // 获取请求的 URL 并移除 /pgy 前缀
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/^\/pgy/, '');
  const destinationUrl = proxyUrl + path + url.search;


  // 创建一个新的请求，指向目标 URL
  const newRequest = new Request(destinationUrl, context.request);

  // 发送请求并返回响应
  return fetch(newRequest);
}
