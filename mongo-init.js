const pipelines = require('./fixtures/pipelines_with_anomalies.json');

console.log('PIPELINES:', pipelines.length);

db = db.getSiblingDB('pipelines');

db.pipelines.insertMany(pipelines);
