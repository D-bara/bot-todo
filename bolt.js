// Description:
//   TODO を管理できるボットです
//   あいさつ・時間・おみくじ機能追加。
// Commands:
//   add      - TODO を作成
//   done     - TODO を完了にする
//   del      - TODO を消す
//   list     - TODO の一覧表示
//   donelist - 完了した TODO の一覧表示
//   こんにちは - あいさつを返す
//   何時　　　 - 現在時刻を返す
//   おみくじ  - 運勢を返す。

'use strict';
const bolt = require('@slack/bolt');
const dotenv = require('dotenv');
dotenv.config();
const todo = require('todo');

const app = new bolt.App({
  token : process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: 'debug'
});

app.message(/add (.+)/i, ({context, say}) => {
  const task = context.matches[1].trim();
  if(todo.add(task)) {
    say(`タスク "${task}" はすでにあります`);
  } else {
    say(`追加しました: ${task}`);
  }
});

app.message(/done (.+)/i, ({context, say}) => {
  const task = context.matches[1].trim();
  if(todo.done(task)) {
    say(`タスク "${task}" は存在しません`);
  } else {
    say(`完了しました: ${task}`);
  }
});

app.message(/del (.+)/i, ({context, say}) => {
  const task = context.matches[1].trim();
  if(todo.del(task)) {
    say(`タスク "${task}" は存在しません`);
  } else {
    say(`完了しました: ${task}`);
  }
});

app.message(/^list/i, ({context, say}) => {
  const list = todo.list();
  if(list.length === 0) {
    say('TODO はありません');
  } else {
    say(list.join('\n'));
  }
});

app.message(/donelist/i, ({context, say}) => {
  const donelist = todo.donelist();
  if(donelist.length === 0) {
    say('完了したTODO はありません');
  } else {
    say(donelist.join('\n'));
  }
});

app.message(/こんにちは/i, ({message, say}) => {
  say(`こんにちは! <@${message.user}>さん`);
});

app.message(/何時/i, ({message, say}) => {
  const now = new Date();
  const time = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒`
  say(time);
});

const lots = ['大吉', '吉', '中吉', '末吉', '凶'];
const lot = lots[Math.floor(Math.random() * lots.length)];

app.message(/おみくじ/i, ({message, say}) => {
  say(`<@${message.user}>さんの運勢は ${lot} です。`);
});

app.start();