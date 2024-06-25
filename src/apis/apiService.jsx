/* eslint-disable react-refresh/only-export-components */
// apiService.js

import axios from "axios";

const BASE_URL = "https://bkscoring.algorithmic.uz/api";

export const getLogin = async (username, password) => {

    try {
        // console.log(`${BASE_URL}/Auth?userName=${username}&password=${password}`)
        const response = await axios.post(`${BASE_URL}/Auth?userName=${username}&password=${password}`);
        return  response;
    } catch (error) {
        console.error("Error:", error);
    }
};

export const updateUserProfile = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Schools`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_jwt')}`
                },
                body: JSON.stringify({}),
            }
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const getSchoolList = async (schoolId) => {
    try {
        const response = await axios.get(`${BASE_URL}/Grades/School/${schoolId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_jwt')}`
                },
                body: JSON.stringify({}),
            }
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};


export const fetchSchools = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Schools`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_jwt')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching schools:', error);
        throw error;
    }
};

export const fetchClassesBySchoolId = async (schoolId) => {
    try {
        const response = await axios.get(`${BASE_URL}/Grades/School/${schoolId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_jwt')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
    }
};

export const getStudentsByClass = async (grade_id) => {
    try {
        // console.log(`${BASE_URL}/Students/GetByGrade/${grade_id}`)
        const response = await axios.get(`${BASE_URL}/Students/GetByGrade/${grade_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_jwt')}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
    }
};
export const getDailyProcessByGrade = async (data) => {
    try {
        const response = await axios.get(`${BASE_URL}/DailyProcess/GetByGrade/${data.gradeId}?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_jwt')}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
    }
};
export const AddDialogNewDate = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/DailyProcess?date=${data.date}&theme=${data.topic}&gradeId=${data.gradeId}`);
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
};
export const AddStudentMark = async (data) => {
    try {
        const response = await axios.patch(`${BASE_URL}/DailyProcess`, data);
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
};
export const getStudentScoreByID = async (data) => {
    // console.log(`${BASE_URL}/DailyProcess/GetScore?processId=${data.themeId}&studentId=${data.studentId}`);
    try {
        const response = await axios.get(
            `${BASE_URL}/DailyProcess/GetScore?processId=${data.themeId}&studentId=${data.studentId}`);
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
};