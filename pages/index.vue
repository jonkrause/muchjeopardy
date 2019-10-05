<template>
  <div class="questionContainer">
    <div v-if="loading"></div>
    <div v-else class="infoDiv">
      <div class="value">${{dataObj[questionID].value}}</div>
      <div class="category">{{dataObj[questionID].category}}</div>
    </div>
    <div v-if="loading" class="loader"></div>
    <div v-else class="clueDiv">
      <div
        class="question"
        v-if="!questionHidden"
        @click="answerHidden = !answerHidden; questionHidden = !questionHidden"
      >{{dataObj[questionID].clue}}</div>
      <div
        class="answer"
        v-if="!answerHidden"
        @click="answerHidden = !answerHidden; questionHidden = !questionHidden"
      >{{dataObj[questionID].answer}}</div>
    </div>
    <div v-if="loading"></div>
    <div v-else class="footer">
      <div class="nextButton">
        <button class="btn" @click="makeNew">Random</button>
      </div>
      <div class="airdate">Original airdate: {{dataObj[questionID].airdate}}</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.setQuestion();
  },
  data() {
    return {
      questionHidden: false,
      answerHidden: true,
      questionID: "",
      loading: false,
      dataObj: {}
    };
  },
  methods: {
    async readFromRealtimeDb() {
      this.loading = true;
      const question = this.$fireDb.ref("random5k");
      try {
        const snapshot = await question.once("value");
        this.dataObj = snapshot.val();
        this.loading = false;
      } catch (e) {
        console.log(e);
        return;
      }
    },
    makeNew() {
      this.answerHidden = true;
      this.questionHidden = false;
      this.questionID = this.getRand(0, 4999);
    },
    setQuestion() {
      this.answerHidden = true;
      this.questionHidden = false;
      this.questionID = this.getRand(0, 4999);
      this.readFromRealtimeDb();
    },
    getRand(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>

<style>
.questionContainer {
  margin: 0 auto;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  text-align: center;
  color: #fff;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "info"
    "question"
    "airdate";
  grid-gap: 0;
}
.infoDiv {
  grid-area: info;
  margin-bottom: 30px;
  /* background-color: salmon; */
}
.value {
  /* grid-area: value; */
  font-size: 6em;
  font-family: "Coda", cursive;
  color: #f4e27c;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.9);
}
.category {
  /* grid-area: category; */
  font-family: "Frank Ruhl Libre", serif;
  font-size: 3.4em;
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.9);
}
.clueDiv {
  grid-area: question;
  font-family: "PT Serif", serif;
  font-size: 3.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10vw;
  cursor: pointer;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.9);
}
.footer {
  grid-area: airdate;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  font-family: "PT Serif", serif;
  font-size: 1;
}
.btn {
  width: auto;
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.3em;
  background-color: transparent;
  color: #fff;
  border: none;
  font-family: "Coda", cursive;
  font-weight: 100;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.2s;
}
.btn:hover {
  opacity: 0.8;
  transition: 0.2s;
}
@media all and (max-width: 768px) {
  .value {
    font-size: 4em;
  }
  .category {
    font-size: 1.5em;
  }
  .clueDiv {
    font-size: 1.5em;
    padding: 10px;
  }
  .btn {
    position: unset;
    display: block;
    margin: 0 auto;
    padding: 10px 0;
  }
}

/*== CSS Loader ==*/
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
