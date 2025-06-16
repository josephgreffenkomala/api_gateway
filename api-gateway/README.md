# API Gateway Load Testing

## Deskripsi Proyek
Proyek ini bertujuan untuk melakukan pengujian beban (load testing) pada beberapa endpoint API menggunakan [k6](https://k6.io/). Pengujian ini membantu memastikan bahwa API dapat menangani sejumlah besar permintaan secara bersamaan tanpa mengalami penurunan performa.


## Endpoint yang Diuji
1. **Auth Login**  
   URL: `http://192.168.49.2:30080/auth/api/auth/login`  
   Metode: `POST`  
   Deskripsi: Endpoint untuk autentikasi pengguna menggunakan email dan password.

2. **Speech to Text**  
   URL: `http://192.168.49.2:30080/ai/speech2text`  
   Metode: `POST`  
   Deskripsi: Endpoint untuk mengonversi teks menjadi data yang dapat diproses oleh AI.  
   Header: `Authorization` dengan token Bearer.

3. **Progress Recommendation**  
   URL: `http://192.168.49.2:30080/progress/api/progress/recommendation/123`  
   Metode: `GET`  
   Deskripsi: Endpoint untuk mendapatkan rekomendasi progres berdasarkan ID.  
   Header: `Authorization` dengan token Bearer.

4. **Health Check**  
   URL: `http://192.168.49.2:30080/health`  
   Metode: `GET`  
   Deskripsi: Endpoint untuk memeriksa status kesehatan aplikasi.

## Cara Menjalankan Pengujian
1. Pastikan Anda telah menginstal [k6](https://k6.io/docs/getting-started/installation/).
2. Jalankan perintah berikut di terminal untuk memulai pengujian:
   ```bash
   k6 run test/load-test.js