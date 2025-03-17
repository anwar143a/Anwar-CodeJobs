from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os

class RequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/users.json':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            users = json.loads(post_data.decode('utf-8'))
            
            with open('users.json', 'w') as f:
                json.dump(users, f, indent=4)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_GET(self):
        if self.path == '/users.json':
            try:
                with open('users.json', 'r') as f:
                    users = json.load(f)
            except FileNotFoundError:
                users = []
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(users).encode())
        else:
            return SimpleHTTPRequestHandler.do_GET(self)

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run() 