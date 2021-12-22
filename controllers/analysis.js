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
    const length = arr.length;

    arr = arr.map(person => {
        let now = new Date().getFullYear();
        let age = now - person.date_of_birth.split('/')[2];
        let gender = person.gender;
        return {
            gender: gender,
            age: age
        }
    });

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

    return {
        female_by_age: femaleArr,
        male_by_age: maleArr
    }
}

const careerAnalysis = (arr) => {
    
    let arrCareer = [];
    arrCareer['Học sinh'] = 0;
    arrCareer['Sinh viên'] = 0;
    arrCareer['Lao động tự do'] = 0;
    arrCareer['Công nhân'] = 0;
    arrCareer['Giáo viên'] = 0;
    arrCareer['Lập trình viên'] = 0;
    arrCareer['Kinh doanh'] = 0;

    for (let i = 0; i < arr.length; i++) {
        const career = arr[i].career.trim();
        arrCareer[career]++;
    }
    const career = {
        'Học sinh': arrCareer['Học sinh'],
        'Sinh viên': arrCareer['Sinh viên'],
        'Lao động tự do': arrCareer['Lao động tự do'],
        'Công nhân': arrCareer['Công nhân'],
        'Giáo viên': arrCareer['Giáo viên'],
        'Lập trình viên': arrCareer['Lập trình viên'],
        'Kinh doanh': arrCareer['Kinh doanh']
    }
    return career;
}

const religiousAnalysis = (arr) => {

    let arrReligion = [];
    arrReligion['Không'] = 0;
    arrReligion['Đạo Phật'] = 0;
    arrReligion['Thiên Chúa'] = 0;


    for (var i = 0; i < arr.length; i++) {
        const religion = arr[i].religion.trim();
        arrReligion[religion]++;
    }

    const religion = {
        'Không': arrReligion['Không'],
        'Đạo Phật': arrReligion['Đạo Phật'],
        'Thiên Chúa': arrReligion['Thiên Chúa']
    }

    return religion;
}

const handleData = (data) => {
    let total_person = 0;
    let femaleArr = Array(18).fill(0);
    let maleArr = Array(18).fill(0);
    let arrCareer = [];
    arrCareer['Học sinh'] = 0;
    arrCareer['Sinh viên'] = 0;
    arrCareer['Lao động tự do'] = 0;
    arrCareer['Công nhân'] = 0;
    arrCareer['Giáo viên'] = 0;
    arrCareer['Lập trình viên'] = 0;
    arrCareer['Kinh doanh'] = 0;
    let arrReligion = [];
    arrReligion['Không'] = 0;
    arrReligion['Đạo Phật'] = 0;
    arrReligion['Thiên Chúa'] = 0;
    for (let i = 0; i < data.length; i++) {
        total_person += data[i].total_person;
        for (let j = 0; j < data[i].gender_by_age.male_by_age.length; j++) {
            femaleArr[j] += data[i].gender_by_age.female_by_age[j];
            maleArr[j] += data[i].gender_by_age.male_by_age[j];
        }

        for(let key in data[i].career) {
            if(data[i].career.hasOwnProperty(key)) {
                arrCareer[key] += data[i].career[key];
            }
        }
        for(let key in data[i].religion) {
            if(data[i].religion.hasOwnProperty(key)) {
                arrReligion[key] += data[i].religion[key];
            }
        }
    }
    const religion = {
        'Không': arrReligion['Không'],
        'Đạo Phật': arrReligion['Đạo Phật'],
        'Thiên Chúa': arrReligion['Thiên Chúa']
    }
    const career = {
        'Học sinh': arrCareer['Học sinh'],
        'Sinh viên': arrCareer['Sinh viên'],
        'Lao động tự do': arrCareer['Lao động tự do'],
        'Công nhân': arrCareer['Công nhân'],
        'Giáo viên': arrCareer['Giáo viên'],
        'Lập trình viên': arrCareer['Lập trình viên'],
        'Kinh doanh': arrCareer['Kinh doanh']
    }
    return {
        total_person: total_person,
        gender_by_age: {
            female_by_age: femaleArr,
            male_by_age: maleArr
        },
        career: career,
        religion: religion
    }
}

export const analysisByGroup = async (req, res) => {
    try {
        const group_id = req.params._id;
        let people = await PersonModel.find({residential_group_id: group_id});
        const genderByAge = ageAndGenderAnalysis(people);
        const career = careerAnalysis(people);
        const religion = religiousAnalysis(people);
        const checkDataAvailable = await AnalysisModel.findById(group_id);
        if (checkDataAvailable) {
            const data = {
                total_person: people.length,
                gender_by_age: genderByAge,
                career: career,
                religion: religion
            };
            await AnalysisModel.findByIdAndUpdate(group_id, data);
        }else {
            const data = {
                _id: group_id,
                total_person: people.length,
                gender_by_age: genderByAge,
                career: career,
                religion: religion,
                belong: group_id.slice(0, group_id.length - 2)
            };
            const dataByGroup = new AnalysisModel(data);
            await dataByGroup.save();
        }
        res.status(200).json('phân tích thành công!');
    } catch (error) {
        res.status(500).json('có lỗi xảy ra!');
    }
}

export const analysisByLocal = async (req, res) => {
    try {
        const _id = req.params._id;
        const result = await AnalysisModel.find({belong: _id});
        const checkDataAvailable = await AnalysisModel.findById(_id);
        if (checkDataAvailable) {
            await AnalysisModel.findByIdAndUpdate(_id, handleData(result));
        }else {
            let data = handleData(result);
            data._id = _id;
            if (_id.length > 2) {
                data.belong = _id.slice(0, _id.length - 2);
            }
            const dataByLocal = new AnalysisModel(data);
            await dataByLocal.save();
        }
        res.status(200).json('phân tích thành công!');
    } catch (error) {
        res.status(500).json('có lỗi xảy ra!');
    }
}

export const getData = async (req, res) => {
    try {
        const _id = req.params._id;
        const data = await AnalysisModel.findById(_id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json('có lỗi xảy ra!')
    }
}