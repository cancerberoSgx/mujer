import { createReadStream } from "fs";
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { join } from "path";
import { Deferred } from 'misc-utils-of-mine-generic';
export async function staticServer(basePath: string, port = 9999): Promise<Server> {
  const server = await createServer((req: IncomingMessage, res: ServerResponse) => {
    var stream = createReadStream(join(basePath, req.url||''));
    stream.on('error', function () {
      res.writeHead(404);
      res.end();
    });
    stream.pipe(res);
  }).listen(port);
  const p = new Deferred<Server>()
  await server
  server.on('listening', ()=>{
    p.resolve(server)
  })
  return p
}
