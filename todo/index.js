"use strict";
// { name: タスクの文字列, state: 完了しているかどうかの真偽値 }
let tasks = [];
const  fs = require('fs');
const fileName = './tasks.json';

// 同期的にファイルから復元
try {
  const data = fs.readFileSync(fileName, 'utf8');
  tasks = JSON.parse(data);
} catch(ignore) {
  console.log(fileName + 'から復元できませんでした')
}

/**
 * タスクをファイルに保存する
 */
// stringify で配列を文字列に変更する
function saveTasks() {
  fs.writeFileSync(fileName, JSON.stringify(tasks), 'utf8');
}

/**
 * TODOを追加する
 * @param {string} taskName 
 */
function add(taskName) {
  const indexFound = tasks.findIndex(task => task.name === taskName);
  if(indexFound === -1) {
    tasks.push({ name: taskName, state: false });
    saveTasks();
  } else {
    return true;
  }
}

/**
 * タスクが完了したかどうかを返す
 * @param {object} task 
 * @return {boolean} 完了したかどうか
 // boolean 真偽値のこと
 */
function isDone(task) {
  return task.state;
}

/**
 * タスクが未完了かどうかを返す
 * 完了したかを返す
 * @param {object} task 
 * @return {boolean} 未完了したかどうか
 */
 function isNotDone(task) {
  return !isDone(task);
}

/**
 * TODOの一覧の配列を取得する
 * @returns {array}
 */
function list() {
  return tasks
    .filter(isNotDone)
    .map(task => task.name);
}

/**
 * TODOを完了状態にする
 * @param {string} taskName 
 */
function done(taskName) {
  const indexFound = tasks.findIndex(task => task.name === taskName);
  if(indexFound !== -1) {
    tasks[indexFound].state = true;
    saveTasks();
  } else {
    return true;
  }
}

/**
 * TODOの一覧の配列を取得する
 * @returns {array}
 */
 function donelist() {
  return tasks
    .filter(isDone)
    .map(task => task.name);
}

/**
 * 項目を削除する
 * @param {string} taskName 
 */
function del(taskName) {
  const indexFound = tasks.findIndex(task => task.name === taskName);
  if(indexFound !== -1) {
    tasks.splice(indexFound, 1);
    saveTasks();
  } else {
    return true;
  }
}

module.exports = {
  add, list, done, donelist, del
}