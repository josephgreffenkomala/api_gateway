---

## 🎯 Tujuan Aplikasi

Aplikasi ini dirancang untuk mendukung **scalability** yang tinggi, memungkinkan sistem untuk menangani peningkatan jumlah permintaan secara efisien. Dengan memanfaatkan teknologi seperti **Horizontal Pod Autoscaler (HPA)**, **Docker**, dan **Kubernetes**, aplikasi ini dapat memastikan performa yang optimal bahkan di bawah beban kerja yang berat. Tujuan utama adalah menciptakan solusi yang dapat diskalakan untuk memenuhi kebutuhan bisnis yang terus berkembang.

---

## ✨ Fitur Utama

1. **API Gateway**: Mengelola permintaan API dari berbagai layanan backend.
2. **Load Testing**: Menggunakan k6 untuk menguji performa API di bawah beban tinggi.
3. **Scalability**: 
   - Mendukung penskalaan otomatis menggunakan **Horizontal Pod Autoscaler (HPA)**.
   - Dirancang untuk menangani permintaan dalam jumlah besar secara efisien.
4. **Containerization**: Semua layanan dijalankan menggunakan **Docker** untuk memastikan konsistensi lingkungan.
5. **Orkestrasi**: Menggunakan **Kubernetes (K8s)** untuk mengelola container dan layanan.
6. **Autentikasi**: Mendukung autentikasi berbasis token Bearer untuk melindungi endpoint tertentu.
7. **Monitoring**: Menyediakan endpoint kesehatan (`/health`) untuk memantau status aplikasi.

---

## 🌐 Endpoint yang Diuji

1. **Auth Login**  
   - **URL**: `http://192.168.49.2:30080/auth/api/auth/login`  
   - **Metode**: `POST`  
   - **Deskripsi**: Endpoint untuk autentikasi pengguna menggunakan email dan password.  
   - **Payload**:
     ```json
     {
       "email": "komalagreffen959@gmail.com",
       "password": "singalaut"
     }
     ```

2. **Speech to Text**  
   - **URL**: `http://192.168.49.2:30080/ai/speech2text`  
   - **Metode**: `POST`  
   - **Deskripsi**: Endpoint untuk mengonversi teks menjadi data yang dapat diproses oleh AI.  
   - **Header**: `Authorization` dengan token Bearer.  
   - **Payload**:
     ```json
     {
       "text": "i went to the store and bought some milk. um, it was like really expensive you know. its price was high!"
     }
     ```

3. **Progress Recommendation**  
   - **URL**: `http://192.168.49.2:30080/progress/api/progress/recommendation/123`  
   - **Metode**: `GET`  
   - **Deskripsi**: Endpoint untuk mendapatkan rekomendasi progres berdasarkan ID.  
   - **Header**: `Authorization` dengan token Bearer.

4. **Health Check**  
   - **URL**: `http://192.168.49.2:30080/health`  
   - **Metode**: `GET`  
   - **Deskripsi**: Endpoint untuk memeriksa status kesehatan aplikasi.

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
1. **Docker**: Pastikan Docker telah diinstal di sistem Anda. [Panduan instalasi Docker](https://docs.docker.com/get-docker/).
2. **Kubernetes**: Pastikan cluster Kubernetes telah dikonfigurasi. Anda dapat menggunakan Minikube, Kind, atau cluster cloud seperti GKE, EKS, atau AKS.
3. **k6**: Instal k6 untuk pengujian beban. [Panduan instalasi k6](https://k6.io/docs/getting-started/installation/).

### Langkah-Langkah
1. **Build Docker Image**:
   ```bash
   docker build -t api-gateway:latest .
   ```

2. **Deploy ke Kubernetes**:
   - Terapkan konfigurasi deployment:
     ```bash
     kubectl apply -f k8s/deployment.yaml
     ```
   - Terapkan konfigurasi service:
     ```bash
     kubectl apply -f k8s/service.yaml
     ```
   - Terapkan konfigurasi HPA:
     ```bash
     kubectl apply -f k8s/hpa.yaml
     ```

3. **Verifikasi Deployment**:
   - Periksa pod yang berjalan:
     ```bash
     kubectl get pods
     ```
   - Periksa service yang tersedia:
     ```bash
     kubectl get svc
     ```

4. **Jalankan Pengujian Beban**:
   - Jalankan pengujian menggunakan k6:
     ```bash
     k6 run test/load-test.js
     ```

---

## ⚙️ Konfigurasi Pengujian
- **Virtual Users (VUs)**: 20 pengguna virtual.
- **Durasi**: 12 detik.
- **Jeda antar permintaan**: 2 detik per pengguna.

---

## 🛠 Teknologi yang Digunakan
- **Node.js**: Untuk pengembangan API Gateway.
- **k6**: Untuk pengujian beban API.
- **Docker**: Untuk containerization layanan.
- **Kubernetes (K8s)**: Untuk orkestrasi container.
- **Horizontal Pod Autoscaler (HPA)**: Untuk penskalaan otomatis berdasarkan beban kerja.
- **JavaScript**: Bahasa pemrograman untuk menulis script pengujian.

---

## 🔑 Token Authorization
Token digunakan untuk mengakses endpoint yang membutuhkan autentikasi. Token disimpan dalam variabel global di file `load-test.js` untuk mempermudah pengelolaan. Contoh token yang digunakan dalam proyek ini adalah:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3NzNiNDViMC1hMDMxLTRlNzctOTM1Ny1lOTE5MjEyNGMzOWIiLCJlbWFpbCI6ImtvbWFsYWdyZWZmZW45NTlAZ21haWwuY29tIiwiaWF0IjoxNzUwMDAzOTc3LCJleHAiOjE3NTAwMDc1Nzd9.r7j6a4Pw1MNyv_veCJzOg0L_RVKeNPPSx0sHwDLR_Dw
```

---

## 👥 Kontributor
- **Joseph Greffen Komala**
- **Hafid Sasayuda Ambardi**
- ** David Neilleen Irvinne**
- **Nugroho Adi Santoso**

---

## 📌 Catatan
- Pastikan semua dependensi dan layanan yang diperlukan telah berjalan sebelum menjalankan pengujian atau menggunakan API Gateway.
- Endpoint dan token yang digunakan dalam proyek ini adalah contoh dan dapat disesuaikan dengan kebutuhan Anda.