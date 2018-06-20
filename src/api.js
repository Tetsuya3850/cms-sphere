import axios from "axios";
import { getToken } from "./helper";
const SERVER_URL =
  "http://ec2-18-179-113-100.ap-northeast-1.compute.amazonaws.com";
axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

export function login(payload) {
  return axios.post(`${SERVER_URL}/login`, payload);
}

export function getScenarios() {
  return axios.get(`${SERVER_URL}/scenarios`);
}

export function getSequences(id) {
  return axios.get(`${SERVER_URL}/sequences?scenario_id=${id}`);
}

export function getScenario(id) {
  return axios.get(`${SERVER_URL}/scenarios/${id}`);
}

export function postScenario(payload) {
  return axios.post(`${SERVER_URL}/scenarios`, payload);
}

export function updateScenario(id, payload) {
  return axios.post(`${SERVER_URL}/scenarios/${id}`, payload);
}

export function addSequence(payload) {
  return axios.post(`${SERVER_URL}/sequences`, payload);
}

export function getSequence(id) {
  return axios.get(`${SERVER_URL}/sequences/${id}`);
}

export function updateSequence(id, payload) {
  return axios.post(`${SERVER_URL}/sequences/${id}`, payload);
}

export function deleteScenario(id) {
  return axios.delete(`${SERVER_URL}/scenarios/${id}`);
}

export function deleteSequence(id) {
  return axios.delete(`${SERVER_URL}/sequences/${id}`);
}

export function getAWSCredentials() {
  return axios.get(`${SERVER_URL}/aws/credentials`);
}

const uploadImg = (id, img) =>
  axios.post(`${SERVER_URL}/add/pic/${id}`, img, {
    headers: { "Content-Type": "multipart/form-data" }
  });
