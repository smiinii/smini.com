"use strict";
(function () {
  let startTime = null;
  let intervalId = null;
  let sessionElapsed = 0; // 밀리초 단위
  let totalSec = 0;       // 하루 누적 시간 (초)

  window.addEventListener("load", init);

  function init() {
    id("start-btn").addEventListener("click", startStudy);
    id("pause-btn").addEventListener("click", pauseStudy);
    id("stop-btn").addEventListener("click", stopStudy);
    updateLiveTime(0);
    renderTodayFocus(); // 0으로 시작
  }

  function startStudy() {
    startTime = Date.now();
    id("start-btn").disabled = true;
    id("pause-btn").disabled = false;
    id("stop-btn").disabled = false;

    intervalId = setInterval(() => {
      let now = Date.now();
      let elapsed = now - startTime;
      updateLiveTime(sessionElapsed + elapsed);
    }, 1000);
  }

  function pauseStudy() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      sessionElapsed += Date.now() - startTime;
      intervalId = null;
      startTime = null;
    }

    id("start-btn").disabled = false;
    id("pause-btn").disabled = true;
  }

  function stopStudy() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      sessionElapsed += Date.now() - startTime;
    }

    let sessionSec = Math.floor(sessionElapsed / 1000);
    totalSec += sessionSec;

    // 초기화
    sessionElapsed = 0;
    intervalId = null;
    startTime = null;

    updateLiveTime(0);
    renderTodayFocus();

    id("start-btn").disabled = false;
    id("pause-btn").disabled = true;
    id("stop-btn").disabled = true;
  }

  function updateLiveTime(ms) {
    let min = Math.floor(ms / 60000);
    let sec = Math.floor((ms % 60000) / 1000);
    id("live-time").innerHTML = `현재 공부 시간: <span class="highlight">${min}분 ${sec}초</span>`;
  }

  function renderTodayFocus() {
    let min = Math.floor(totalSec / 60);
    let sec = totalSec % 60;
    id("today-focus").innerHTML = `오늘 누적 시간: <span class="highlight">${min}분 ${sec}초</span>`;
  }

  function id(name) {
    return document.getElementById(name);
  }
})();
