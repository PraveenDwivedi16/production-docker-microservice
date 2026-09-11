# 🐳 Production-Ready Containerized 2-Tier Microservice
A production-grade containerization architecture for a 2-Tier web application (Node.js API + PostgreSQL) implementing DevOps and DevSecOps best practices.
## 🚀 Key Architectural Highlights
* **Multi-Stage Docker Build:** Reduced image size from ~850MB down to **~46MB (compressed)** using Alpine Linux and decoupled build/runtime environments.
* **Least-Privilege Security (DevSecOps):** Application runs under an isolated non-root user (`appuser`, UID: 10001) rather than default `root`.
* **Reliable Service Orchestration:** Implemented Docker Compose health checks with `service_healthy` condition to prevent application startup race conditions with PostgreSQL.
* **Data Persistence:** Dedicated named Docker volumes for zero data-loss during container recreation.
* **Isolated Networking:** Custom bridge network for secure inter-service communication.
## 🛠️ Tech Stack
* **Runtime:** Node.js, Express.js
* **Database:** PostgreSQL 15 (Alpine)
* **Containerization:** Docker, Docker Compose
* **Base OS:** Alpine Linux
## 📦 How to Run Locally

### 1. Clone the repository
bash
git clone https://github.com/PraveenDwivedi16/production-docker-microservice.git
cd production-docker-microservice

2. Configure Environment Variables
bash
cp .env.example .env
3. Start the Application Stack
bash
docker compose up -d --build
4. Verify Health & Connectivity
bash
curl http://localhost:3000/health
# Output: {"status":"UP","database":"CONNECTED"}

📊 Optimization Comparison
Metric	Standard Single-Stage	Optimized Multi-Stage
Base Image	node:18 (Debian)	node:18-alpine
Security User	root (Vulnerable)	appuser (Hardened)
Image Size	~850 MB	~195 MB (46.7 MB compressed)
Attack Surface	High (Compilers/Tools included)	Minimal (Only production dependencies)


Author: Praveen Dwivedi (AWS & RHCSA Certified DevOps Engineer)
