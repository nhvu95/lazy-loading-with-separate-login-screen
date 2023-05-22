1. open Windows/System32/dirvers/etc
2. Add these line into host file

127.0.0.1       localdomain
192.168.1.50       localdomain

3. Replace 192.168.1.50 with your Docker IP, which similar `host.docker.internal` or `gateway.docker.internal`
4. Run the command `docker compose up -d` to host by Docker
5. Access localdomain:7890 and login with account admin / password123
6. Have fun! This source code is made by ChatGPT 90%.