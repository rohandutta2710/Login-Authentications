const express = require('express');
const fs = require('fs');
const app=express();
const fileName="./LoginApi.json";
const jsonData=fs.readFileSync(fileName,"utf-8");