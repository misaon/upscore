import { PassThrough } from 'node:stream';

const tunnel = new PassThrough();

const writeToTunnel = () => {
  const data = Math.random();
  tunnel.write(`data: ${JSON.stringify(data)}\n\n`);
};
setInterval(writeToTunnel, 10_000);

export default defineEventHandler((event) => {
  event.node.res.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });

  return sendStream(event, tunnel);
});
