<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div class="jumbotron vertical-center">
      <h1>Welcome to SyncUp <font-awesome-icon icon="sync" />
</h1>
      <h4>You can track your patient's vitals below.</h4>
      <br>
    </div>
    <div class="container">

      <div class="row">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Number of Steps <font-awesome-icon icon="walking" /> </h5>

              <p class="card-text text-muted">The number of steps your patient has walked today.</p>
              <p class="card-text big-number">{{step}}</p>
              <p class="card-text" style="text-align:center; margin-top:-20px;">steps</p>


              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Heart Rate </h5>
              <div class="row">
                <div class="col-4">
                  <p class="card-text text-muted" style="text-align:center;">Their most recent heart rate measurement.</p>
                  <p class="card-text big-number">{{heartrate}}</p>
                  <p class="card-text" style="text-align:center; margin-top:-20px;"><font-awesome-icon icon="heart" pulse/>  bpm</p>
                </div>
                <div class="col-8">
                  <TrendChart
                    :datasets="[
                      {
                        data: [79, 88, 120, 100, 90, 88],
                        smooth: true,
                        fill: true
                      }
                    ]"
                    :grid="{
                      verticalLines: true,
                      horizontalLines: true
                    }"
                    :labels="{
                      xLabels: ['23:00', '01:00', '03:00', '05:00', '07:00', '09:00'],
                      yLabels: 5
                    }"  
                    :min="0">
                  </TrendChart>
                </div>
              </div>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Live Location <font-awesome-icon icon="map-pin" /></h5>
              <p class="card-text text-muted">Their last live location</p>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255278.87830327367!2d103.56245575298644!3d1.3367654400861635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0f7573762f55%3A0xb0ddd7656013b71b!2sThe%20Hive%20NTU!5e0!3m2!1sen!2ssg!4v1580500513180!5m2!1sen!2ssg&zoom=9" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Mental Health <font-awesome-icon icon="brain" /></h5>
              <p class="card-text text-muted">Their general mood</p>
              <p class="card-text big-number">{{mood}}</p>

              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card disabled">
            <div class="card-body">
              <h5 class="card-title">Recent Thoughts</h5>
              <p class="card-text text-muted">Coming soon!</p>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const socket = io("http://b4c282d9.ngrok.io/");

// import { data } from "../main.js";

export default {
  name: "Home",
  data: function() {
    return {
      step: null,
      heartrate: null,
      mood: null
    };
  },
  mounted() {
    var dat;
    const socket = require("socket.io-client")("https://b4c282d9.ngrok.io/");
    socket.on("data", myData => {
      dat = myData;
      this.step = dat.steps;
      this.heartrate = dat.heartData;
      this.mood = dat.emotion;
      // console.log(dat);
    });

    // export const data = dat
    // export const socket = io("http://b4c282d9.ngrok.io/");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  font-family: "Nanum Gothic", sans-serif;
}

.row {
  margin-top: 10px;
  margin-bottom: 20px;
}

.jumbotron {
  text-align: center;
  background-color: transparent;
  /* width:100vw; */
  align-items: center;
  font-family: "Nanum Gothic", sans-serif;
  padding-bottom: 0px;
}

.jumbotron h1 {
  padding-bottom: 20px;
}

.card {
  min-height: 45vh;
}

.big-number {
  font-size: 3em;
  text-align: center;
}
</style>