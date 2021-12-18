import { AnalysisModel } from "../models/AnalysisModel.js";
import { PersonModel } from "../models/PersonModel.js";

// xử lý tính toán phần trăm giới tính nam nữ theo độ tuổi 
// ở đây có 18 thang tuổi (0;4) ,(5,9), ..., (80-84), 85+
const ageAndGenderAnalysis = (arr) => {
    // tham số arr ở đây là 1 mảng lưu các object có dạng { gender: person.gender, age: person.age };
    // age = new Date().getFullYear() - năm sinh
    let categoryArr = Array(18).fill(0); 
    let femaleArr = Array(18).fill(0);// mảng lưu số lượng nữ theo độ tuổi
    let maleArr = Array(18).fill(0);// mảng lưu số lượng nam theo độ tuổi
    let percentAge = [];// mảng lưu tỉ lệ nam, nữ(lưu dưới dạng object)
    const length = arr.length;

    for (let i = 0; i < length; i++) {
        const data = arr[i];
        const index = Math.floor(data.age / 5);
        if(index > 17) {
            categoryArr[17]++;
        } else {
            if (data.gender == "Nam") {
                maleArr[index]++;
            } else if (data.gender == "Nữ") {
                femaleArr[index]++;
            }
            categoryArr[index]++;
        }
    }

    for (let i = 0; i < categoryArr.length; i++) {
        let percentFemale = Number.parseFloat(femaleArr[i] / length * 100).toFixed(1);
        let percentMale = Number.parseFloat(maleArr[i] / length * 100).toFixed(1);
        let obj = { female: percentFemale, male: percentMale }; // object này lưu tỉ lệ nam, nữ từng độ tuổi
        percentAge.push(obj);
    }
    return percentAge;
}

const careerAnalysis = (arr) => {
    
    let arrJob = [];
    arrJob['Học sinh'] = 0;
    arrJob['Sinh viên'] = 0;
    arrJob['Lao động tự do'] = 0;
    arrJob['Công nhân'] = 0;
    arrJob['Giáo viên'] = 0;
    arrJob['Lập trình viên'] = 0;
    arrJob['Kinh doanh'] = 0;

    for (let i = 0; i < arr.length; i++) {
        const job = arr[i].career.trim();
        arrJob[job]++;
    }
    return arrJob;
}

const religiousAnalysis = (arr) => {

    var arrReligion = [];
    arrReligion['Không'] = 0;
    arrReligion['Đạo Phật'] = 0;
    arrReligion['Thiên Chúa'] = 0;


    for (var i = 0; i < arr.length; i++) {
        const religion = arr[i].religion.trim();
        arrReligion[religion]++;
    }

    // arrReligion.map((data, i) => {
    //     return Number.parseFloat(data / arr.length * 100).toFixed(1);
    // })

    return arrReligion;
}

// const careerAnalysis = (people) => {
//     let arrJob = handleJob(people);
//     const job = {
//         'Học sinh': arrJob['Học sinh'],
//         'Sinh viên': arrJob['Sinh viên'],
//         'Lao động tự do': arrJob['Lao động tự do'],
//         'Cng nhân': arrJob['Công nhân'],
//         'Giáo viên': arrJob['Giáo viên'],
//         'Lập trình viên': arrJob['Lập trình viên'],
//         'Kinh doanh': arrJob['Kinh doanh']
//     }
//     return job;
// }

// const religiousAnalysis = (people) => {
//     let arrReligion = handleReligion(people);
//     const religion = {
//         'Không': arrReligion['Không'],
//         'Đạo Phật': arrReligion['Đạo Phật'],
//         'Thiên Chúa': arrReligion['Thiên Chúa']
//     }
//     return religion;
// }