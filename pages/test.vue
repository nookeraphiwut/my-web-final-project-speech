
<template>
    <div class="bg-test">
        <div>
    <input type="file" accept="image/*" @change="handleFileChange">
  </div>

    </div>
</template>

<script setup>
// import axios from 'axios';
// import fs from 'fs/promises';
// // const axios = require('axios');
// // const fs = require('fs');

// // อ่านไฟล์รูปภาพเพื่อเตรียมส่งไปยัง Vision API
// const imageFilePath = 'gucci1.jpg';
// const imageContent = fs.readFileSync(imageFilePath).toString('base64');

// // ข้อมูลสำหรับส่งไปยัง Vision API
// const requestData = {
//   requests: [
//     {
//       image: {
//         content: imageContent
//       },
//       features: [
//         {
//           type: 'LOGO_DETECTION',
//           maxResults: 5 // จำนวน logo ที่ต้องการ detect (สูงสุด 5 รายการ)
//         }
//       ]
//     }
//   ]
// };

// // กำหนด configuration สำหรับการเรียกใช้ Vision API
// const apiUrl = 'https://vision.googleapis.com/v1/images:annotate';
// const apiKey = 'AIzaSyBjE6ZE64FyWR-4NRrEJG_FLWd6g_yz6dw'; // แทนที่ YOUR_API_KEY ด้วย API key ของคุณ

// // ส่ง request ไปยัง Vision API โดยใช้ axios
// axios.post(apiUrl, requestData, {
//   params: { key: apiKey },
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then(response => {
//   console.log(response.data); // แสดงผลลัพธ์ที่ได้จาก Vision API
// })
// .catch(error => {
//   console.error('Error:', error);
// });

</script>
<style>

.bg-test{
    height: 100dvh;
    background: #f4f4f4f4;
}
</style>